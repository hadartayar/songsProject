using Pro3ServerSide.Models.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Pro3ServerSide.Models
{
    public class Ingredient
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Image { get; set; }

        public int Calories { get; set; }

        public Ingredient()
        {

        }

        public List<Ingredient> Get()
        {
            DBServices db = new DBServices();
            return db.GetIngredients();
        }

        public void Insert()
        {
            DBServices db = new DBServices();
            db.InsertIngredient(this);
        }
    }
}