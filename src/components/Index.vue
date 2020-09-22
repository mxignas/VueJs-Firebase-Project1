<template>
  <div class="index container">
    <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
      <div class="card-content">
        <em class="material-icons delete" @click="deleteSmoothie(smoothie.id)">delete</em>
        <h2 class="indigo-text">{{ smoothie.title }}</h2>
        <ul class="ingredients">
          <li v-for="(ing, index) in smoothie.ingredients" :key="index">
            <span class="chip">{{ ing }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import db from'@/firebase/init'

export default {
  name: "Index",
  data() {
    return {
      smoothies: [],
    };
  },
  methods: {
    deleteSmoothie(id) {
  // delete doc from firestore
      db.collection('smoothies').doc(id).delete().then(() => {
        // delete from the front end
         this.smoothies = this.smoothies.filter((smoothie) => {
          return smoothie.id != id;
      });
      })
    },
  },
  created() {
    //fetch data from the firestore
    db.collection('smoothies').get().then((snapshot) => {
      snapshot.forEach((doc) => {
        let smoothie = doc.data();
        smoothie.id = doc.id;
        this.smoothies.push(smoothie)
      })
    })
  }
};
</script>

<style>
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /* one collumn is taking 1fr - kinda similar to 33% */
  grid-gap: 30px;
  margin-top: 60px;
}
.index h2 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}
.index .ingredients {
  margin: 30px auto;
}
.index .ingredients li {
  display: inline-block;
}
.index .delete {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
</style>
