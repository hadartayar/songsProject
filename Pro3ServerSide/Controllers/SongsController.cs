using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Pro3ServerSide.Models;


namespace Pro3ServerSide.Controllers
{
    public class SongsController : ApiController
    {
        // GET api/<controller> Get List of All songs
        //[HttpGet]
        //[Route("api/Songs/Get")]
        public IHttpActionResult Get()
        {
            try
            {
                Song s = new Song();
                List<Song> songsList = s.Get();
                return Ok(songsList);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }

        }

        //public List<Song> Get()
        //{
        //    Song s = new Song();
        //    return s.Get();
        //}

        ////// GET api/<controller>/5
        //[HttpGet]
        //[Route("api/Songs/GetById")]
        public IHttpActionResult Get(int id)
        {
            //Song s = new Song();
            //Song res = s.GetSongById(id);

            //if (res != null)
            //{
            //    return Request.CreateResponse<Song>(HttpStatusCode.OK, res);
            //}
            //else
            //{
            //    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "The song not found");
            //}

            try
            {
                Song res = new Song();
                res = res.GetSongById(id);
                return Ok(res);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }
        }


        // POST api/<controller>
        public IHttpActionResult Post([FromBody] Song song)
        {
            try
            {
                int rowsAffected = song.Insert();
                return Created(new Uri(Request.RequestUri.AbsoluteUri), rowsAffected);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }
        }

        // PUT api/<controller>/5
        public HttpResponseMessage Put([FromBody] Song song)
        {
            if (song.Update() == 1)
            {
                return Request.CreateResponse(HttpStatusCode.OK, "Song Updated");
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "-1");
            }
        }

        // DELETE api/<controller>/5
        [HttpDelete]
        [Route("api/Songs/Delete")]
        public IHttpActionResult Delete(int sId)
        {
            try
            {
                Song song = new Song();
                int rowsChanged = song.DeleteSong(sId);
                if (rowsChanged > 0) return Ok();
                return Content(HttpStatusCode.NotFound, $"Song with sid={sId} was not found for deleting!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}