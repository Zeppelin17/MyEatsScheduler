<script>
/**
 * Create recipe form component
 *
 * @summary Create recipe form component
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-07-27 06:32:15 
 * Last modified  : 2020-07-29 07:00:45
 */
</script>

<template>
    <div class="create-recipe-form">
        <div class="form-wrapper">

            <div v-if="validationMsg !== ''" id="validation-msg">
                <span class="close" @click="resetValidationMsg()">x</span>
                <span>{{ validationMsg }}</span>
            </div>

            <form @submit.prevent="createRecipeRequest">

                <div class="form-col">
                    <div class="form-group">
                        <label for="recipe-name-input">
                            <span>{{ $t('appPages.recipes.inputRecipeName') }}</span>
                            <input required v-model="recipeName" name="recipe-name-input" type="text" />
                        </label>
                    </div>

                    <div class="form-group">
                        <label for="recipe-categories-input">
                            <span>{{ $t('appPages.recipes.inputRecipeCategories') }}</span>
                            <input v-model="recipeCategories" name="recipe-categories-input" type="text" />
                        </label>
                    </div>

                    <div class="form-group">
                        <label for="recipe-description-input">
                            <span>{{ $t('appPages.recipes.inputRecipeDescription') }}</span>
                            <textarea v-model="recipeDescription" name="recipe-description-input" ></textarea>
                        </label>
                    </div>

                    <div class="form-group">
                        <label for="recipe-steps-input">
                            <span>{{ $t('appPages.recipes.inputRecipeSteps') }}</span>
                            <textarea v-model="recipeSteps" name="recipe-steps-input" ></textarea>
                        </label>
                    </div>
                </div>

                <div class="form-col">
                    <div class="form-group">
                        
                        <div class="ingredients-list">
                            <h3>{{ $t('appPages.recipes.ingredientsListTitle') }}</h3>
                            
                            <div class="ingredient-group">
                                <label for="recipe-ingredient-name" class="name">
                                    <span>{{ $t('appPages.recipes.inputRecipeIngredientName') }}</span>
                                    <input v-model="ingredient.name" name="recipe-ingredient-name" type="text" />
                                </label>

                                <label for="recipe-ingredient-qty" class="qty">
                                    <span>{{ $t('appPages.recipes.inputRecipeIngredientQty') }}</span>
                                    <input v-model="ingredient.qty" name="recipe-ingredient-qty" type="text" />
                                </label>

                                <label for="recipe-ingredient-uom" class="uom">
                                    <span>{{ $t('appPages.recipes.inputRecipeIngredientUOM') }}</span>
                                    <input v-model="ingredient.uom" name="recipe-ingredient-uom" type="text" />
                                </label>
                            </div>

                            <button 
                                @click="addIngredient" 
                                type="button"
                            >
                                {{ $t('appPages.recipes.newIngredient') }}
                            </button>

                            <ul>
                                <li 
                                    v-for="(ingredient, index) in recipeIngredients"
                                    :key="index"
                                >
                                    {{ ingredient.name }}<span v-if="ingredient.qty.length > 0">: {{ ingredient.qty }}</span> <span v-if="ingredient.uom.length > 0">{{ ingredient.uom }}</span>

                                </li>
                            </ul>
                        </div>
                        
                        
                    </div>
                </div>
                
            </form>

          </div>
    </div>
</template>

<script>

export default {
  name: 'CreateRecipeForm',
  data() {
      return {
          validationMsg: "",
          recipeName: "",
          recipeCategories: [],
          recipeDescription: "",
          recipeIngredients: [],
          ingredient: {
              name: '',
              qty: '',
              uom: '',
          },
          recipeSteps: "",
          
      }
  },
  methods: {

      resetValidationMsg() {
          this.validationMsg = ""
      },

      addIngredient() {
          if (this.ingredient.name === '') return

          let ing = {...this.ingredient}
          this.recipeIngredients.push(ing)

          this.ingredient.name = ''
          this.ingredient.qty = ''
          this.ingredient.uom = ''
      }
  }
}
</script>