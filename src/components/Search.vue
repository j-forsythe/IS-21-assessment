<template>
  <div class="col-12 col-md-6">
    <form @submit.prevent="fetchSearchResults" class="form-inline my-2 mx-auto">
      <input v-model="query" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" required>
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
    <modal name="searchModal" height="85%" width="85%">
      <div class="modal-header">
        <h5>Search Results for: {{ query }}</h5>
        <button @click="hide" type="button" class="close" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div v-if="loading">loading...</div>
      <ul v-else class="card-deck">
        <li v-if="searchResults.length" v-for="book in searchResults" :key="book.id" class="my-2 card">
          <BookCard :book="book" :onShelf="false" @addBook="handleAdd(book)"></BookCard>
        </li>
        <li v-else>No Results found</li>
      </ul>
    </modal>
  </div>
</template>

<script>
import axios from "axios";
import BookCard from "./BookCard.vue";

export default {
    name: "Search",

    components: {
        BookCard
    },

    data() {
        return {
            query: "",
            loading: true,
            searchResults: []
        };
    },

    methods: {
        fetchSearchResults() {
            if (!this.query) return false;
            this.show();
            this.loading = true;
            axios
                .get(
                    `https://www.googleapis.com/books/v1/volumes?q=${
                        this.query
                    }&key=AIzaSyCmilA54ocSLe5AUJNveMEX-Lsu3M8xBJA`
                )
                .then(({ data: { items } }) => (this.searchResults = items))
                .catch(error => console.log(error));
            this.loading = false;
        },

        handleAdd(newBook) {
            this.$emit("addBook", newBook);
            this.removeFromSearch(newBook);
        },

        removeFromSearch(book) {
            this.searchResults = this.searchResults.filter(
                item => item.id !== book.id
            );
            return this.searchResults;
        },

        show() {
            this.$modal.show("searchModal");
        },
        hide() {
            this.$modal.hide("searchModal");
        }
    }
};
</script>

<style lang="scss" scoped>
.card-deck {
    height: 100%;
    overflow-y: scroll;
}

.card {
    flex: 0 0 30%;
}
</style>
