<template>
  <div class="">
    <img :src="book.volumeInfo.imageLinks.thumbnail" :alt="`${book.volumeInfo.title} cover`" class="card-img-top">
    <div class="card-body">
      <h3 class="card-title">{{ book.volumeInfo.title }}</h3>
      <h4 v-for="(author, index) in book.volumeInfo.authors" :key="index" class="card-subtitle">{{ author }}</h4>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          Genres: <span v-for="(genre, index) in book.volumeInfo.categories" :key="index">{{ genre }}</span>
        </li>
        <li class="list-group-item">
          Price: {{ price }}
        </li>
        <li class="list-group-item">
          <StarRating :rating="book.volumeInfo.averageRating" :read-only="true" :star-size="20" :show-rating="false" :inline="true">
          </StarRating>
          ({{ bookRating }})
        </li>
        <li class="list-group-item" role="group">
            <BookView :book="book"></BookView>
            <button v-if="!onShelf" class="btn btn-success" @click="handleAdd(book)">Add</button>
            <button v-if="onShelf" class="btn btn-danger" @click="handleDelete(book)">Delete</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BookView from "./BookView.vue";
import StarRating from "vue-star-rating";

export default {
    name: "BookCard",

    components: {
        BookView,
        StarRating
    },

    props: {
        book: {
            type: Object,
            required: true
        },

        onShelf: {
            type: Boolean,
            required: true
        }
    },

    computed: {
        /* If a book does not have a list price, 
      then it should be listed as Free 
      otherwise include the price with currency */
        price() {
            let price = this.book.saleInfo.listPrice;
            return price ? `${price.amount} ${price.currencyCode}` : "Free";
        },

        bookRating() {
            return !this.book.volumeInfo.ratingsCount
                ? 0
                : this.book.volumeInfo.ratingsCount;
        }
    },

    methods: {
        // send which book is to be deleted/added to Bookshelve component
        handleDelete(book) {
            this.$emit("deleteBook", book);
        },

        handleAdd(book) {
            this.$emit("addBook", book);
        }
    }
};
</script>
