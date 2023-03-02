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
    public class RecipesController : ApiController
    {
        public IHttpActionResult Get()
        {
            try
            {
                Recipe rec = new Recipe();
                List<Recipe> list = rec.Get();
                return Ok(list);
            }
            catch (Exception ex)
            {
                //return BadRequest(ex.Massage);
                return Content(HttpStatusCode.BadRequest, ex);
            }
        }
        ////Get the RecipesArr length to know the next ID.
        //public IHttpActionResult Get(int num)
        //{
        //    try
        //    {
        //        Recipe rec = new Recipe();
        //        int length = rec.Get(num);
        //        return Ok(length);
        //    }
        //    catch (Exception ex)
        //    {
        //        //return BadRequest(ex.Massage);
        //        return Content(HttpStatusCode.BadRequest, ex);
        //    }
        //}

    }
}
