<template>
  <div>
    <button @click="show" type="button" class="btn btn-secondary">View</button>
    <modal :name="book.id" height="auto" width="90%">
      <button @click="hide" type="button" class="close" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      <div class="book-details row p-4 justify-content-center align-items-center">
        <div class="col-12 col-md-4">
          <img :src="book.volumeInfo.imageLinks.smallThumbnail" :alt="`${book.volumeInfo.title} cover`">
        </div>
        <div class="col-12 col-md-8">
            <h2>{{ book.volumeInfo.title }}</h2>
            <h3 v-for="(author, index) in book.volumeInfo.authors" :key="index">{{ author }}</h3>
            <p class="card-text">{{ book.volumeInfo.description }}</p>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
export default {
    name: "BookView",

    props: {
        book: {
            type: Object,
            required: true
        }
    },

    methods: {
        show() {
            this.$modal.show(this.book.id);
        },
        hide() {
            this.$modal.hide(this.book.id);
        }
    }
};
</script>

<style>
.close {
    position: absolute;
    right: 1rem;
    top: 1rem;
    z-index: 8;
}

.book-detail {
    height: 100%;
    overflow-y: scroll;
}
</style>
