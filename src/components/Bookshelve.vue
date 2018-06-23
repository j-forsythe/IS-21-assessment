<template>
  <div class="container">
    <h1>Online Catelogue</h1>
    <ul class="card-deck">
      <li v-for="book in bookshelve" :key="book.id" class="my-2 card">
        <BookCard :book="book" @deleteBook="handleDeleteBook(book)"></BookCard>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import bookStorage from "../bookStorage";
import BookCard from "./BookCard.vue";

export default {
    name: "Bookshelve",

    components: {
        BookCard
    },

    data() {
        return {
            bookshelve: bookStorage.fetch()
        };
    },

    mounted() {
        // find a local storage of books or fetch the predetermined list from Google books
        this.bookshelve.length ? this.bookshelve : this.fetchBookshelve();
    },

    methods: {
        fetchBookshelve() {
            // Using Google Books API to retrieve a Bookshelve that I created for this assignment
            // axios was used for simplicity and its a small but powerful dependancy
            axios
                .get(
                    "https://www.googleapis.com/books/v1/users/106567664552519638398/bookshelves/1001/volumes?key=AIzaSyCmilA54ocSLe5AUJNveMEX-Lsu3M8xBJA"
                )
                .then(({ data: { items } }) => {
                    this.bookshelve = items;
                    bookStorage.save(items);
                })
                .catch(error => console.log(error));
        },

        handleDeleteBook(book) {
            // This will remove the item from the DOM and local storage
            this.bookshelve = this.bookshelve.filter(
                item => item.id !== book.id
            );
            bookStorage.save(this.bookshelve);
            return this.bookshelve;
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
