using Pro3ServerSide.Models.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Pro3ServerSide.Models
{
    public class TotalRecipe
    {
        Recipe recipe;
        List<int> ingIdArr;

        public Recipe Recipe { get => recipe; set => recipe = value; }
        public List<int> IngIdArr { get => ingIdArr; set => ingIdArr = value; }



        public void InsertRecipe(TotalRecipe total)
        {
            DBServices db = new DBServices();
            db.InsertRecipe(total.recipe);

            int recId = total.recipe.Id;
            foreach (int ingId in total.IngIdArr)
            {
                db.InsertToRecipe_Ing(recId, ingId);
            }
        }
    }
}