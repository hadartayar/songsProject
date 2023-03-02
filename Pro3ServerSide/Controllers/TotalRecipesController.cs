using Pro3ServerSide.Models;
using Pro3ServerSide.Models.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Pro3ServerSide.Controllers
{
    public class TotalRecipesController : ApiController
    {
        //Get Ingredients of specific Recipe
        public IHttpActionResult Get(int Id)
        {
            try
            {
                Recipe rec = new Recipe();
                List<Ingredient> list = rec.GetIngredients(Id);
                return Ok(list);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }
        }

        public IHttpActionResult Post([FromBody] TotalRecipe newRecipe)
        {
            try
            {
                TotalRecipe rec = new TotalRecipe();
                rec.InsertRecipe(newRecipe);
                return Created(new Uri(Request.RequestUri.AbsoluteUri + newRecipe.Recipe.Id), newRecipe.Recipe);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}
