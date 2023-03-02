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
    public class IngredientsController : ApiController
    {
        public IHttpActionResult Get()
        {
            try
            {
                Ingredient ing = new Ingredient();
                List<Ingredient> list = ing.Get();
                return Ok(list);
            }
            catch (Exception ex)
            {
                //return BadRequest(ex.Massage);
                return Content(HttpStatusCode.BadRequest, ex);
            }
        }

        public IHttpActionResult Post([FromBody] Ingredient newIngredient)
        {
            try
            {
                //DBServices.students.Add(newIngredient);
                newIngredient.Insert();
                return Created(new Uri(Request.RequestUri.AbsoluteUri + newIngredient.Id), newIngredient);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }
        }


    }
}
