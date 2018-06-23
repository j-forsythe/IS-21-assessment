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
          <li class="list-group-item btn-group" role="group">
              <button class="btn btn-primary" @click="handleDelete(book)">Delete</button>
              <BookView :book="book"></BookView>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
import BookView from "./BookView.vue";
export default {
    name: "BookCard",

    components: {
        BookView
    },

    props: {
        book: {
            type: Object,
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
        }
    },

    methods: {
        // send which book is to be deleted to Bookshelve component
        handleDelete(book) {
            this.$emit("deleteBook", book);
        }
    }
};
</script>
