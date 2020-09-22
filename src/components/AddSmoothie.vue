
<template>
  <div class="add-smoothie container z-depth-1">
    <h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>
    <form @submit.prevent="addSmoothie">
      <div class="field title">
        <label for="title">Smoothie title:</label>
        <input type="text" name="title" v-model="title">
      </div>
      <!-- With that div and v-for cycle, its creating new label and input everytime we press tab. -->
      <div v-for="(ing, index) in ingredients" class="field ingredient" :key="index"> <!-- cycle through ingredients and have index as the key -->
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" v-model="ingredients[index]"> <!-- if we update this on the browser, it updates ingredients on the data() -->
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add an ingredient (press tab to add):</label>
        <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Add Smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'
export default {
  name: 'AddSmoothie',
  data(){
    return{
      title: null,
      ingredients: [],
      another: null,
      feedback: null,
      slug: null
    }
  },
  methods: {
    addSmoothie(){
      if(this.title){ // if this is true
        this.feedback = null
        // create a slug
        this.slug = slugify(this.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        //save smoothie to firestore
        db.collection('smoothies').add({
          title: this.title,
          ingredients: this.ingredients,
          slug: this.slug
        }).then(() => {
          this.$router.push({ name: 'Index' }) // redirecting user to a home page after adding to a database
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.feedback = 'You must enter a smoothie title' // if there is no title
      }
    },
    addIng(){
      if(this.another){
        this.ingredients.push(this.another) // another is the value of the input field
        this.another = null // resetting the input value to enter a new one
        this.feedback = null // clearing out the feedback once we adding value
        }
        else { // if "another" is empty and user press tab
            this.feedback = 'You must enter a value to add another ingredient'
      }
    },
    deleteIng(ing){
      this.ingredients = this.ingredients.filter(ingredient => {
        return ingredient != ing
      })
    }
  }
}
</script>

<style>
.add-smoothie{
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.add-smoothie h2{
  font-size: 2em;
  margin: 20px auto;
}
.add-smoothie .field{
  margin: 20px auto;
  position: relative;
}
.add-smoothie .delete{
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
