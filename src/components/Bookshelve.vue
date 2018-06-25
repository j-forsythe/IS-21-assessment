<template>
  <div class="container">
    <div class="row my-4">
      <h1 class="col-12 col-md-6">Online Catelogue</h1>
      <Search @addBook="book => newBook = book"></Search>
      <div class="my-4 btn-group mx-auto">
        <button @click="sortParam = 'volumeInfo.averageRating', sortDirection = 'desc'" class="btn btn-primary">Sort by Rating</button>
        <button @click="sortParam = 'volumeInfo.title'" class="btn btn-primary">Sort by Title</button>
        <button @click="sortParam = 'saleInfo.listPrice.amount'" class="btn btn-primary">Sort by Price</button>
      </div>
    </div>
    <ul class="card-deck">
      <li v-if="loading">Loading...</li>
      <li v-else v-for="book in bookshelve" :key="book.id" class="my-2 card">
        <BookCard :book="book" @deleteBook="handleDeleteBook(book)" :onShelf="true"></BookCard>
      </li>
    </ul>
  </div>
</template>

<script>
import _ from "lodash";
import axios from "axios";
import Search from "./Search.vue";
import BookCard from "./BookCard.vue";
import bookStorage from "../bookStorage";

export default {
    name: "Bookshelve",

    components: {
        Search,
        BookCard
    },

    data() {
        return {
            newBook: {},
            sortParam: "",
            loading: false,
            sortDirection: "asc",
            bookshelve: bookStorage.fetch()
        };
    },

    watch: {
        newBook: {
            handler: function() {
                this.handleAddBook(this.newBook);
            },
            immediate: true
        },

        sortParam: {
            handler() {
                this.handleSort();
            },
            immediate: true
        }
    },

    created() {
        // find a local storage of books or fetch the predetermined list from Google books
        if (this.bookshelve.length > 1) return this.bookshelve;
        this.fetchBookshelve();
    },

    methods: {
        fetchBookshelve() {
            // Using Google Books API to retrieve a Bookshelve that I created for this assignment
            // axios was used for simplicity and its a small but powerful dependancy
            this.loading = true;
            axios
                .get(
                    "https://www.googleapis.com/books/v1/users/106567664552519638398/bookshelves/1001/volumes?key=AIzaSyCmilA54ocSLe5AUJNveMEX-Lsu3M8xBJA"
                )
                .then(({ data: { items } }) => {
                    this.bookshelve = items;
                    bookStorage.save(items);
                })
                .catch(error => console.log(error));

            this.loading = false;
        },

        handleDeleteBook(book) {
            // This will remove the item from the DOM and local storage
            this.bookshelve = this.bookshelve.filter(
                item => item.id !== book.id
            );
            bookStorage.save(this.bookshelve);
            return this.bookshelve;
        },

        handleAddBook(book) {
            if (_.isEmpty(book)) return false;
            this.bookshelve = this.bookshelve.concat(book);
            bookStorage.save(this.bookshelve);
            return this.bookshelve;
        },

        handleSort() {
            return (this.bookshelve = _.orderBy(
                this.bookshelve,
                this.sortParam,
                this.sortDirection
            ));
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
    flex: 0 0 30%;
}
</style>
