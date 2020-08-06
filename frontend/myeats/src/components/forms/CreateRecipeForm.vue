<script>
/**
 * Create recipe form component
 *
 * @summary Create recipe form component
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-07-27 06:32:15
 * Last modified  : 2020-08-06 07:01:34
 */
</script>

<template>
  <div class="create-recipe-form">
    <div class="form-wrapper">
      <div v-if="validationMsg !== ''" id="validation-msg">
        <span class="close" @click="resetValidationMsg()">x</span>
        <span>{{ validationMsg }}</span>
      </div>

      <form @submit.prevent="createRecipe">
        <div class="form-col">
          <div class="form-group">
            <label for="recipe-name-input">
              <span>{{ $t("appPages.recipes.inputRecipeName") }}</span>
              <input
                required
                v-model="recipeName"
                name="recipe-name-input"
                type="text"
              />
            </label>
          </div>

          <div class="form-group">
            <label for="recipe-categories-input">
              <span>{{ $t("appPages.recipes.inputRecipeCategories") }}</span>
              
              <div class="input-tags">
                <div v-for="(cat, index) in recipeCategories" :key="cat" class="tag">
                  <span @click="deleteCategory(index)">x</span>
                  {{ cat }}
                </div>

                <input
                  name="recipe-categories-input"
                  type="text"
                  @keydown.enter="addCategory"
                  @keydown.188="addCategory"
                  @keydown.delete='removeLastCategory'
                />
              </div>

            </label>
          </div>

          <div class="form-group">
            <label for="recipe-description-input">
              <span>{{ $t("appPages.recipes.inputRecipeDescription") }}</span>
              <textarea
                v-model="recipeDescription"
                name="recipe-description-input"
              ></textarea>
            </label>
          </div>

          <div class="form-group">
            <label for="recipe-steps-input">
              <span>{{ $t("appPages.recipes.inputRecipeSteps") }}</span>
              <textarea
                v-model="recipeSteps"
                name="recipe-steps-input"
              ></textarea>
            </label>
          </div>
        </div>

        <div class="form-col">
          <div class="form-group">
            <div class="ingredients-list">
              <h3>{{ $t("appPages.recipes.ingredientsListTitle") }}</h3>

              <div class="ingredient-group">
                <label for="recipe-ingredient-name" class="name">
                  <span>{{
                    $t("appPages.recipes.inputRecipeIngredientName")
                  }}</span>
                  <input
                    v-model="ingredient.name"
                    name="recipe-ingredient-name"
                    type="text"
                    ref="ingredientNameInput"
                  />
                </label>

                <label for="recipe-ingredient-qty" class="qty">
                  <span>{{
                    $t("appPages.recipes.inputRecipeIngredientQty")
                  }}</span>
                  <input
                    v-model="ingredient.qty"
                    name="recipe-ingredient-qty"
                    type="text"
                  />
                </label>

                <label for="recipe-ingredient-uom" class="uom">
                  <span>{{
                    $t("appPages.recipes.inputRecipeIngredientUOM")
                  }}</span>
                  <input
                    v-model="ingredient.uom"
                    name="recipe-ingredient-uom"
                    type="text"
                  />
                </label>
              </div>

              <button
                @click="addIngredient"
                type="button"
                class="new-ingredient"
              >
                {{ $t("appPages.recipes.newIngredient") }}
              </button>

              <ul v-show="recipeIngredients.length > 0">
                <li
                  v-for="(ingredient, index) in recipeIngredients"
                  :key="index"
                >
                  <div class="recipe-ingredient">
                    {{ ingredient.name
                    }}<span v-if="ingredient.qty.length > 0"
                      >: {{ ingredient.qty }}</span
                    >
                    <span v-if="ingredient.uom.length > 0">{{
                      ingredient.uom
                    }}</span>
                  </div>
                  <div class="ingredient-actions">
                    <button type="button">
                      <img
                        @click="deleteIngredient(index)"
                        :src="require('../../assets/img/ikonate/close.svg')"
                        class="t-all-ease"
                      />
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="submit">
          <button type="submit">
            {{ $t("appPages.recipes.createSubmitButton") }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateRecipeForm",
  data() {
    return {
      validationMsg: "",
      recipeName: "",
      recipeCategories: [],
      recipeDescription: "",
      recipeIngredients: [],
      ingredient: {
        name: "",
        qty: "",
        uom: "",
      },
      recipeSteps: "",
    };
  },
  methods: {
    resetValidationMsg() {
      this.validationMsg = ""
    },

    addIngredient() {
      if (this.ingredient.name === "") return

      let ing = { ...this.ingredient }
      this.recipeIngredients.push(ing)

      this.ingredient.name = ""
      this.ingredient.qty = ""
      this.ingredient.uom = ""

      this.$refs.ingredientNameInput.focus()
    },

    deleteIngredient(index) {
      this.recipeIngredients.splice(index, 1)
    },

    addCategory(event) {
      event.preventDefault()
      let val = event.target.value.trim()
      if (val.length > 0) {
        this.recipeCategories.push(val)
        event.target.value = ""
      }
    },

    deleteCategory(index) {
      this.recipeCategories.splice(index, 1)
    },

    removeLastCategory(event) {
      if(event.target.value.length === 0) {
        this.deleteCategory(this.recipeCategories.length-1)
      }
    },

    /**
     * Create new recipe with API Service
     */
    createRecipe() {
      
      this.$emit("recipe-created");
    },
  },
};
</script>

<style scoped>
.t-all-ease {
  transition: all .5s ease;
}

.create-recipe-form h3 {
  @apply mb-3
}

.create-recipe-form .form-wrapper form .form-group {
    @apply mb-2
}

.create-recipe-form .form-wrapper form .form-group label {
    @apply flex flex-col max-w-full mx-auto bg-blue-300 rounded-t-md rounded-b-md border-2 border-blue-300
}
.create-recipe-form .form-wrapper form .form-group label span {
    @apply py-0 px-2 pb-0 text-left text-xs text-gray-600
}

.create-recipe-form .form-wrapper form .form-group label input,
.create-recipe-form .form-wrapper form .form-group label textarea {
    @apply py-0 px-2 bg-blue-300 rounded-b-md text-sm
}

.create-recipe-form .form-wrapper form .form-group .ingredient-group label {
  @apply mb-2
}

.create-recipe-form .form-wrapper form input:focus,
.create-recipe-form .form-wrapper form textarea:focus {
    @apply outline-none shadow-md
}

.create-recipe-form .form-wrapper form .form-group .ingredients-list button.new-ingredient {
  @apply mt-1 mb-3 text-xs text-blue-100 bg-blue-700 border-2 border-blue-700 px-1 rounded-sm outline-none
}

.create-recipe-form .form-wrapper form .form-group .ingredients-list button.new-ingredient:hover,
.create-recipe-form .form-wrapper form .form-group .ingredients-list button.new-ingredient:focus  {
  @apply bg-blue-100 text-blue-700 shadow-md
}

.create-recipe-form .form-wrapper form .form-group .ingredients-list ul {
    @apply text-left border-2 border-blue-900 rounded-lg
}

.create-recipe-form .form-wrapper form .form-group .ingredients-list ul li {
  @apply flex items-center justify-between px-3 py-1 border-b-2 border-blue-900
}

.create-recipe-form .form-wrapper form .form-group .ingredients-list ul li:last-child {
    @apply border-0
}

.create-recipe-form .form-wrapper form .form-group .ingredients-list ul .recipe-ingredient {
    @apply w-11/12
}

.create-recipe-form .form-wrapper form .form-group .ingredients-list ul .ingredient-actions {
    @apply flex ml-1 w-1/12
}

.create-recipe-form .form-wrapper form .form-group .ingredients-list ul .ingredient-actions button {
    @apply outline-none
}

.create-recipe-form .form-wrapper form .form-group .ingredients-list ul .ingredient-actions button img {
  @apply w-full
}

.create-recipe-form .form-wrapper form .form-group .ingredients-list ul .ingredient-actions button img:hover {
    transform: rotate(-90deg);
}

.create-recipe-form .form-wrapper form .submit{
    @apply mt-6
}

.create-recipe-form .form-wrapper form .submit button {
    @apply text-blue-100 bg-blue-900 border-2 border-blue-900 p-2 rounded-md outline-none
}

.create-recipe-form .form-wrapper form .submit button:hover,
.create-recipe-form .form-wrapper form .submit button:focus {
    @apply bg-blue-100 text-blue-900 shadow-md
}


.create-recipe-form .form-wrapper form .form-group .input-tags {
  @apply flex items-center justify-start pl-1 overflow-hidden overflow-x-auto
}

.create-recipe-form .form-wrapper form .form-group .input-tags .tag {
  @apply flex items-center justify-start flex-row-reverse bg-blue-700 text-blue-100 text-xs rounded-sm mr-1 pl-2 pr-1 max-w-full whitespace-no-wrap
}

.create-recipe-form .form-wrapper form .form-group .input-tags span {
  @apply text-blue-300 p-0 pl-2 pr-1
}

.create-recipe-form .form-wrapper form .form-group .input-tags span:hover {
  @apply text-blue-100 cursor-pointer
}

.create-recipe-form .form-wrapper form .form-group .input-tags input {
  @apply flex-grow
}







@media (min-width: 768px) {
  .create-recipe-form .form-wrapper form {
    @apply flex justify-around items-center items-stretch flex-wrap
  }

  .create-recipe-form .form-wrapper form .form-col {
    width: 47%;
  }

  .create-recipe-form .form-wrapper form .form-group .ingredients-list {
    @apply max-w-full
  }

  .create-recipe-form .form-wrapper form .form-group .ingredient-group {
    @apply flex justify-start flex-wrap
  }

  .create-recipe-form .form-wrapper form .form-group .ingredient-group label {
    @apply w-5/12 mb-1 mx-1
  }

  .create-recipe-form .form-wrapper form .form-group .ingredient-group label.name {
    @apply w-1/2
  }

  .create-recipe-form .form-wrapper form .form-group .ingredient-group label.qty,
  .create-recipe-form .form-wrapper form .form-group .ingredient-group label.uom {
    width: 21%
  }

}
</style>
