using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Proiect_mds.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        [Authorize]
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Profil()
        {
            return View();
        }
        public ActionResult Game() //Asta e pt HANGMAN 
        {
            return View();

        }
        public ActionResult Easy()//EASY PT HANGMAN . LA FEL SI MEDIUM SI HARD 
        {
            return View();
        }

        public ActionResult Medium()
        {
            return View();
        }

        public ActionResult Hard()
        {
            return View();
        }

        public ActionResult SpaceInvaders()
        {
            return View();
        }

        public ActionResult SpaceEasy()
        {
            return View();
        }
        public ActionResult SpaceMedium()
        {
            return View();
        }
        public ActionResult SpaceHard()
        {
            return View();
        }


        public ActionResult MemoryGame()
        {
            return View();
        }


        public ActionResult Bears()
        {
            return View();
        }

        public ActionResult CustomSpaceEasy()
        {
            return View();
        }
        public ActionResult CustomSpaceMedium()
        {
            return View();
        }
        public ActionResult CustomSpaceHard()
        {
            return View();
        }

        public ActionResult SpaceEasy1()
        {
            return View();
        }

        public ActionResult SpaceEasy2()
        {
            return View();
        }

        public ActionResult SpaceMedium1()
        {
            return View();
        }

        public ActionResult SpaceMedium2()
        {
            return View();
        }

        public ActionResult SpaceHard1()
        {
            return View();
        }
        public ActionResult SpaceHard2()
        {
            return View();
        }

        public ActionResult Action()
        {
            return View();
        }

        public ActionResult MemStra()
        {
            return View();
        }

        public ActionResult Arcade()
        {
            return View();
        }

        public ActionResult Snake()
        {
            return View();
        }

        public ActionResult Flappy()
        {
            return View("Flappy");
        }

    }
}