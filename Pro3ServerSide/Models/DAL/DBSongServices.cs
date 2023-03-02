using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Pro3ServerSide.Models.DAL
{
    public class DBSongServices
    {
        static List<Song> songsList;
        static int i = 0;
        public int Insert(Song s)
        {
            s.Id = i++;
            songsList.Add(s);
            return 1;
        }

        public List<Song> Read()
        {
            if (songsList == null)
                songsList = new List<Song>();
            return songsList;
        }

        public Song GetSongById(int id)
        {
            foreach (Song s in songsList)
            {
                if (s.Id == id)
                    return s;
            }
            return null;
        }

        public int Update(Song newSong)
        {
            foreach (Song s in songsList)
            {
                if (s.Id == newSong.Id)
                {
                    s.Name = newSong.Name;
                    s.Singer = newSong.Singer;
                    s.Genre = newSong.Genre;
                    s.ReleasedYear = newSong.ReleasedYear;
                }
            }
            return 1;
        }

        //Remove Song by ID
        public int Delete(int sId)
        {
            foreach (Song s in songsList)
            {
                if (s.Id == sId)
                    songsList.Remove(s);
            }
            return 1;
        }
    }
}