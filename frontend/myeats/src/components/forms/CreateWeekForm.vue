
<script>
/**
 * Create week form component
 *
 * @summary Create week form component
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-09-04 06:44:30 
 * Last modified  : 2020-09-04 11:18:18
 */
</script>
<template>
  <div class="create-week-form">
    <div class="form-wrapper">
      <div v-if="validationMsg !== ''" id="validation-msg">
        <span class="close" @click="resetValidationMsg()">x</span>
        <span>{{ validationMsg }}</span>
      </div>

      <form>
        <div class="form-group">
          <label for="week-name-input">
            <span>{{ $t("appPages.myeats.weeks.inputWeekName") }}</span>
            <input
              required
              v-model="weekName"
              name="week-name-input"
              type="text"
            />
          </label>
        </div>

        <div class="form-group">
          <label for="week-firstday-input">
            <span>{{ $t("appPages.myeats.weeks.inputWeekFirstDay") }}</span>
            <select 
              required
              v-model="weekFirstDay"
              name="week-firstday-input"
            >
              <option value="mon">{{ $t("appPages.myeats.weeks.monday") }}</option>
              <option value="sun">{{ $t("appPages.myeats.weeks.sunday") }}</option>
            </select>
          </label>
        </div>


        <div class="submit">
          <button disabled v-if="weekStatus === 'loading'" class="loading-button">
            <img src="../../assets/img/loading.svg" alt="Loading">
          </button>
          <button v-else-if="editableData.name.length === 0" @click.prevent="createWeek">
            {{ $t("appPages.myeats.weeks.createSubmitButton") }}
          </button>
          <button v-else @click.prevent="updateRecipe">
            {{ $t("appPages.myeats.weeks.editSubmitButton") }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { Trans } from '@/plugins/Translation'
import { mapGetters } from 'vuex'
import { CREATE_WEEK } from '@/store/actionTypes'

export default {
  name: "CreateWeekForm",
  props: {
    editableData: {
      type: Object,
      default: () => ({
        id: 0,
        name: "",
        firstDay: ""
      }),
    }, 
  },
  data() {
    return {
      validationMsg: "",
      weekName: "",
      weekFirstDay: ""
    };
  },
  computed: {
      ...mapGetters({
          userId: 'userId',
          weekStatus: 'weekStatus'
      })
  },
  methods: {
    resetValidationMsg() {
      this.validationMsg = ""
    },

    /**
     * Create new week with API Service
     */
    createWeek() {
      if (this.weekName.trim().length === 0) {
        this.validationMsg = this.$t("appPages.myeats.weeks.errorNameMandatory")
        return false
      }
      if (this.weekFirstDay.trim().length === 0) {
        this.validationMsg = this.$t("appPages.myeats.weeks.errorFirstDayMandatory")
        return false
      }
      this.resetValidationMsg()
      
      const newWeek = {
        name: this.weekName,
        first_day: this.weekFirstDay,
        myeats_user: this.userId
      }

      // days array
      let days = []
      const locale = Trans.currentLocale
      switch (locale) {
        case "es":
          days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]
          break;
      
        default:
          days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
          break;
      }
      
      newWeek["days"] = days

      // Creating categories and getting their ID's
      this.$store.dispatch(CREATE_WEEK, newWeek)
      .then((week) => {
        this.cleanForm()
        this.$emit("week-created")
      })
      .catch((err) => {
        console.log("[FORM] ERROR", err)
        this.validationMsg = this.$t("appPages.myeats.weeks.weekCreateError")
      })
      
    },


    /**
     * Update recipe with API Service
     */
    /* updateRecipe() {
      let newIngredients = []
      this.recipeIngredients.forEach((ingredient) => {
        newIngredients.push(ingredient)
      })

      if (this.recipeName.trim().length === 0) {
        this.validationMsg = this.$t("appPages.recipes.errorNameMandatory")
        return false
      }
      this.resetValidationMsg()

      return this.$store.dispatch(UPDATE_CATEGORIES, this.recipeCategories)
      .then(() => {
        let categoryIds = []
        this.categoriesList.forEach((cat) => {
          this.recipeCategories.forEach((recipeCat) => {
            if (cat.name === recipeCat) {
              categoryIds.push(cat.id)
            }
          })
        })
        const updatedRecipe = {
          id: this.editableData.id,
          name: this.recipeName,
          description: this.recipeDescription,
          steps: this.recipeSteps,
          ingredients: newIngredients,
          categories: categoryIds,
          myeats_user: this.userId
        }
        
        return this.$store.dispatch(PUT_RECIPE, updatedRecipe)
      })
      .then(() => {
        this.$emit("recipe-updated")
 
      })
      
    }, */

    

    cleanForm() {
      this.resetValidationMsg()
      this.weekName = ""
      this.weekFirstDay = ""
    },

    /* updateRecipeWithEditableData() {
      if (this.editableData.name.length > 0) {
        this.recipeName = this.editableData.name

        this.editableData.categories.forEach((cat) => {
          this.recipeCategories.push(cat.name)
        })

        this.recipeDescription = this.editableData.description
        this.recipeSteps = this.editableData.steps

        this.editableData.ingredients.forEach((ingredient) => {
          this.recipeIngredients.push({
            name: ingredient.name,
            qty: ingredient.quantity,
            uom: ingredient.unit_of_measure
          })
        })
      }
      
    }*/
  }, 

  /* mounted() {
    this.updateRecipeWithEditableData()
  } */
};
</script>

<style scoped>
.t-all-ease {
  transition: all .5s ease;
}

.create-week-form h3 {
  @apply mb-3
}

.create-week-form .form-wrapper form .form-group {
    @apply mb-2
}

.create-week-form .form-wrapper form .form-group label {
    @apply flex flex-col max-w-full mx-auto bg-blue-300 rounded-t-md rounded-b-md border-2 border-blue-300
}
.create-week-form .form-wrapper form .form-group label span {
    @apply py-0 px-2 pb-0 text-left text-xs text-gray-600
}

.create-week-form .form-wrapper form .form-group label input,
.create-week-form .form-wrapper form .form-group label select {
    @apply py-0 px-2 bg-blue-300 rounded-b-md text-sm
}

.create-week-form .form-wrapper form input:focus,
.create-week-form .form-wrapper form select:focus {
    @apply outline-none shadow-md
}


.create-week-form .form-wrapper form .submit{
    @apply mt-6 w-full
}

.create-week-form .form-wrapper form .submit button {
    @apply text-blue-100 bg-blue-900 border-2 border-blue-900 p-2 rounded-md outline-none
}

.create-week-form .form-wrapper form .submit button:hover,
.create-week-form .form-wrapper form .submit button:focus {
    @apply bg-blue-100 text-blue-900 shadow-md
}

.create-week-form .form-wrapper form .submit button {
  @apply m-auto block
}

.create-week-form .form-wrapper form .submit .loading-button img {
    @apply w-8
}


.create-week-form .form-wrapper #validation-msg {
    @apply py-3 px-1 mb-4  relative bg-red-500 bg-opacity-50 rounded-md text-gray-100 text-sm text-center max-w-sm mx-auto
}

.create-week-form .form-wrapper #validation-msg .close {
    @apply absolute right-0 top-0 py-1 px-2 cursor-pointer text-gray-300
}

.create-week-form .form-wrapper #validation-msg .close:hover {
    @apply text-gray-100
}

@media (min-width: 768px) {
  .create-week-form .form-wrapper form {
    @apply flex flex-col justify-around items-center
  }

  .create-week-form .form-wrapper form .form-group {
    @apply w-1/3
  }

}
</style>