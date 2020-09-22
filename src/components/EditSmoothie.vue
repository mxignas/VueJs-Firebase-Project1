<template>
    <div class="edit-smoothie container" v-if="smoothie">
        <h2>Edit {{ smoothie.title }} smoothie</h2>

        <form @submit.prevent="EditSmoothie">
      <div class="field title">
        <label for="title">Smoothie title:</label>
        <input type="text" name="title" v-model="smoothie.title">
      </div>
      <!-- With that div and v-for cycle, its creating new label and input everytime we press tab. -->
      <div v-for="(ing, index) in smoothie.ingredients" class="field ingredient" :key="index"> <!-- cycle through ingredients and have index as the key -->
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" v-model="smoothie.ingredients[index]"> <!-- if we update this on the browser, it updates ingredients on the data() -->
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add an ingredient (press tab to add):</label>
        <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Update Smoothie</button>
      </div>
    </form>


    </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
    name: 'EditSmoothie',
    data() {
        return {
            smoothie: null,
            another: null,
            feedback: null,

        }
    },
    created() {
        // creating a local variable to retrieve a inside parameter from a database with .where
        let ref = db.collection('smoothies').where('slug', '==', this.$route.params.smoothie_slug)
        // actually retrieving that data with get()
        ref.get().then(snapshot => {
            // cycle through this collection and then for each iteration around we firing function and take that individual doc
            snapshot.forEach(doc => {
                this.smoothie = doc.data()
                // adding iall the data to a "smoothie" with doc.id
                this.smoothie.id = doc.id
            })
        })
    },
    methods: {
        addIng(){
      if(this.another){
        this.smoothie.ingredients.push(this.another) // another is the value of the input field
        this.another = null // resetting the input value to enter a new one
        this.feedback = null // clearing out the feedback once we adding value
        }
        else { // if "another" is empty and user press tab
            this.feedback = 'You must enter a value to add another ingredient'
      }
    },
    deleteIng(ing){
      this.smoothie.ingredients = this.smoothie.ingredients.filter(ingredient => {
        return ingredient != ing
      })
    },
    EditSmoothie(){
        if(this.smoothie.title){ // if this is true
        this.feedback = null
        // create a slug
        this.smoothie.slug = slugify(this.smoothie.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        // update smoothie to firestore
        db.collection('smoothies').doc(this.smoothie.id).update({
            // here we passing through an object parameters that we want to update
          title: this.smoothie.title,
          ingredients: this.smoothie.ingredients,
          slug: this.smoothie.slug
          // just because its a promise, it takes time to update it, so we are firing .then() method which fires function push()
        }).then(() => {
          this.$router.push({ name: 'Index' }) // redirecting user to a home page after editing
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.feedback = 'You must enter a smoothie title' // if there is no title
      }
    }
  }
    }
</script>

<style>
    .edit-smoothie{
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.edit-smoothie h2{
  font-size: 2em;
  margin: 20px auto;
}
.edit-smoothie .field{
  margin: 20px auto;
  position: relative;
}
.edit-smoothie .delete{
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>