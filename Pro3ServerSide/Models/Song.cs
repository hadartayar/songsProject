using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Pro3ServerSide.Models.DAL;


namespace Pro3ServerSide.Models
{
    public class Song
    {
        private int id;
        private string name;
        private string singer;
        private string genre;
        private int releasedYear;

        public Song()
        {

        }

        public Song(int id, string name, string singer, string genre, int releasedYear)
        {
            Id = id;
            Name = name;
            Singer = singer;
            Genre = genre;
            ReleasedYear = releasedYear;
        }

        public int Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
        public string Singer { get => singer; set => singer = value; }
        public string Genre { get => genre; set => genre = value; }
        public int ReleasedYear { get => releasedYear; set => releasedYear = value; }

        public List<Song> Get()
        {
            DBSongServices db = new DBSongServices();
            return db.Read();
        }

        public Song GetSongById(int id)
        {
            DBSongServices db = new DBSongServices();
            return db.GetSongById(id);
        }

        public int Insert()
        {
            DBSongServices db = new DBSongServices();
            return db.Insert(this); //return 1;
        }

        public int Update()
        {
            DBSongServices db = new DBSongServices();
            return db.Update(this);
        }

        public int DeleteSong(int sId)
        {
            DBSongServices db = new DBSongServices();
            return db.Delete(sId);
        }
    }
}