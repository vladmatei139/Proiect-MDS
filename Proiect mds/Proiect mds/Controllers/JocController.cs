using Proiect_mds.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Proiect_mds.Controllers
{
    public class JocController : Controller
    {
        public ActionResult AccesezSpanzurat(string email)
        {
            using (DBUsersEntities1 db = new DBUsersEntities1())
            {
                db.Jocuris.FirstOrDefault(a => a.Nume == "Spanzurat").Nr_accesari++;
                db.SaveChanges();
                return RedirectToAction("Game", "Home");
            }
        }

        public ActionResult AccesezUrsi(string email)
        {
            using (DBUsersEntities1 db = new DBUsersEntities1())
            {
                db.Jocuris.FirstOrDefault(a => a.Nume == "Ursi").Nr_accesari++;
                db.SaveChanges();
                return RedirectToAction("Bears", "Home");
            }
        }

        public ActionResult AccesezInvadez(string email)
        {
            using (DBUsersEntities1 db = new DBUsersEntities1())
            {
                db.Jocuris.FirstOrDefault(a => a.Nume == "Invadez").Nr_accesari++;
                db.SaveChanges();
                return RedirectToAction("SpaceInvaders", "Home");
            }
        }

        public ActionResult AccesezFlap(string email)
        {
            using (DBUsersEntities1 db = new DBUsersEntities1())
            {
                db.Jocuris.FirstOrDefault(a => a.Nume == "Flap").Nr_accesari++;
                db.SaveChanges();
                return RedirectToAction("Flappy", "Home");
            }
        }

        public ActionResult AccesezMemo(string email)
        {
            using (DBUsersEntities1 db = new DBUsersEntities1())
            {
                db.Jocuris.FirstOrDefault(a => a.Nume == "Memo").Nr_accesari++;
                db.SaveChanges();
                return RedirectToAction("MemoryGame", "Home");
            }
        }

        public ActionResult AccesezSnek(string email)
        {
            using (DBUsersEntities1 db = new DBUsersEntities1())
            {
                db.Jocuris.FirstOrDefault(a => a.Nume == "Snek").Nr_accesari++;
                db.SaveChanges();
                return RedirectToAction("Snake", "Home");
            }
        }

        static public string Top3()
        {
            using (DBUsersEntities1 db = new DBUsersEntities1())
            {
                string result = "";
                var v = db.Jocuris.OrderByDescending(a => a.Nr_accesari);
                System.Collections.Generic.List<Jocuri> l = v.ToList();
                l.ForEach(a => result = result + " " + a.Nume);
                string[] vector = result.Split(' ');
                return (vector[1] + " " + vector[2] + " " + vector[3]);
            }
        }

        static public string Primul()
        {
            using (DBUsersEntities1 db = new DBUsersEntities1())
            {
                string result = "";
                var v = db.Jocuris.OrderByDescending(a => a.Nr_accesari);
                System.Collections.Generic.List<Jocuri> l = v.ToList();
                l.ForEach(a => result = result + " " + a.Nume);
                string[] vector = result.Split(' ');
                return (vector[1]);
            }
        }

        static public string Ultimul()
        {
            using (DBUsersEntities1 db = new DBUsersEntities1())
            {
                string result = "";
                var v = db.Jocuris.OrderByDescending(a => a.Nr_accesari);
                System.Collections.Generic.List<Jocuri> l = v.ToList();
                l.ForEach(a => result = result + " " + a.Nume);
                string[] vector = result.Split(' ');
                return (vector[6]);
            }
        }
    }
}