using Pro3ServerSide.Models.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Pro3ServerSide.Models
{
    public class Recipe
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Image { get; set; }

        public string CookingMethod { get; set; }

        public int Time { get; set; }


        public List<Recipe> Get()
        {
            DBServices db = new DBServices();
            return db.GetRecipes();
        }
        //public int Get(int num)
        //{
        //    DBServices db = new DBServices();
        //    return db.GetNumOfRecipes(num);
        //}
        //public void Insert()
        //{
        //    DBServices db = new DBServices();
        //    db.InsertRecipe(this);
        //}

        public List<Ingredient> GetIngredients(int recipeId)
        {
            DBServices db = new DBServices();
            return db.GetRecipeIngredients(recipeId);
        }
    }
}