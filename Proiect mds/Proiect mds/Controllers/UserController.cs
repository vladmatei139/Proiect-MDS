using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Proiect_mds.Models;
using System.Web.Security;
using System.Data.Entity;

namespace Proiect_mds.Controllers
{
    public class UserController : Controller
    {
        // RegistrationAction
        [HttpGet]
        public ActionResult Registration()
        {
            return View();
        }

        // After RegistrationAction
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Registration(User user) //([Bind(Exclude ="Favorite sau ce mai avem")] User user) cred :P
        {
            bool Status = false;
            string Message = "";

            if (ModelState.IsValid)
            {

                #region Email already exists
                var exist = emailExists(user.Email);
                if (exist)
                {
                    ModelState.AddModelError("EmailExists", "Email already exists");
                    return View(user);
                }
                #endregion

                #region Password encryption
                user.Password = Crypto.Hash(user.Password);
                #endregion

                #region Save to DB
                using(DBUsersEntities db = new DBUsersEntities())
                {
                    db.Users.Add(user);
                    db.SaveChanges();

                    Status = true;
                }
                #endregion
            }
            else
            {
                Message = "Invalid request";
            }

            ViewBag.Message = Message;
            ViewBag.Status = Status;
            return View(user);
        }

        //Login
        [HttpGet]
        public ActionResult Login()
        {
            return View();
        }


        //Post Login
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Login(UserLogin login, string ReturnUrl="")
        {
            string message = "";
            using(DBUsersEntities db = new DBUsersEntities())
            {
                var v = db.Users.Where(a => a.Email == login.Email).FirstOrDefault();
                if (v != null)
                {
                    if(string.Compare(Crypto.Hash(login.Password),v.Password) == 0)
                    {
                        int timeout = login.RememberMe ? 525600 : 20;
                        var ticket = new FormsAuthenticationTicket(login.Email, login.RememberMe, timeout);
                        string encrypted = FormsAuthentication.Encrypt(ticket);
                        var cookie = new HttpCookie(FormsAuthentication.FormsCookieName, encrypted);
                        cookie.Expires = DateTime.Now.AddMinutes(timeout);
                        cookie.HttpOnly = true;
                        Response.Cookies.Add(cookie);

                        if (Url.IsLocalUrl(ReturnUrl))
                        {
                            return Redirect(ReturnUrl);
                        }
                        else
                        {
                            return RedirectToAction("Index", "Home");
                        }

                    }
                    else
                    {
                        message = "Invalid email or password";
                    }
                }
                else
                {
                    message = "Invalid email or password";
                }
            }
            ViewBag.Message = message;
            return View();
        }

        //Logout
        [Authorize]
        [HttpPost]
        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("Login", "User");
        }

        [NonAction]
        public bool emailExists(string email)
        {
            using (DBUsersEntities db = new DBUsersEntities())
            {
                var v = db.Users.Where(a => a.Email == email).FirstOrDefault();
                return v == null ? false : true;
            }
        }

        public ActionResult Spanzurat(string email)
        {
            using (DBUsersEntities db = new DBUsersEntities())
            {
                User v = db.Users.FirstOrDefault(a => a.Email == email);

                if (v != null)
                {
                    if (v.Spanzurat == 1)
                    {
                        v.Spanzurat = 0;
                        db.Entry(v).State = EntityState.Modified;
                        db.SaveChanges();
                    }
                                                                              
                    else
                    {
                        
                            v.Spanzurat = 1;
                            db.Entry(v).State = EntityState.Modified;
                            db.SaveChanges();
                       
                    }
                }
                return RedirectToAction("Index", "Home");

            }
        }

        public ActionResult Ursi(string email)
        {
            using (DBUsersEntities db = new DBUsersEntities())
            {
                User v = db.Users.FirstOrDefault(a => a.Email == email);

                if (v != null)
                {
                    if (v.Ursi == 1)
                    {
                        v.Ursi = 0;
                        db.Entry(v).State = EntityState.Modified;
                        db.SaveChanges();
                    }

                    else
                    {

                        v.Ursi = 1;
                        db.Entry(v).State = EntityState.Modified;
                        db.SaveChanges();

                    }
                }
                return RedirectToAction("Index", "Home");

            }
        }


        public ActionResult Memo(string email)
        {
            using (DBUsersEntities db = new DBUsersEntities())
            {
                User v = db.Users.FirstOrDefault(a => a.Email == email);

                if (v != null)
                {
                    if (v.Memo == 1)
                    {
                        v.Memo = 0;
                        db.Entry(v).State = EntityState.Modified;
                        db.SaveChanges();
                    }

                    else
                    {

                        v.Memo = 1;
                        db.Entry(v).State = EntityState.Modified;
                        db.SaveChanges();

                    }
                }
                return RedirectToAction("Index", "Home");

            }
        }

        public ActionResult Flap(string email)
        {
            using (DBUsersEntities db = new DBUsersEntities())
            {
                User v = db.Users.FirstOrDefault(a => a.Email == email);

                if (v != null)
                {
                    if (v.Flap == 1)
                    {
                        v.Flap = 0;
                        db.Entry(v).State = EntityState.Modified;
                        db.SaveChanges();
                    }

                    else
                    {

                        v.Flap = 1;
                        db.Entry(v).State = EntityState.Modified;
                        db.SaveChanges();

                    }
                }
                return RedirectToAction("Index", "Home");

            }
        }


        public ActionResult Invadez(string email)
        {
            using (DBUsersEntities db = new DBUsersEntities())
            {
                User v = db.Users.FirstOrDefault(a => a.Email == email);

                if (v != null)
                {
                    if (v.Invadez == 1)
                    {
                        v.Invadez = 0;
                        db.Entry(v).State = EntityState.Modified;
                        db.SaveChanges();
                    }

                    else
                    {

                        v.Invadez = 1;
                        db.Entry(v).State = EntityState.Modified;
                        db.SaveChanges();

                    }
                }
                return RedirectToAction("Index", "Home");

            }
        }


        public ActionResult Snek(string email)
        {
            using (DBUsersEntities db = new DBUsersEntities())
            {
                User v = db.Users.FirstOrDefault(a => a.Email == email);

                if (v != null)
                {
                    if (v.Snek == 1)
                    {
                        v.Snek = 0;
                        db.Entry(v).State = EntityState.Modified;
                        db.SaveChanges();
                    }

                    else
                    {

                        v.Snek = 1;
                        db.Entry(v).State = EntityState.Modified;
                        db.SaveChanges();

                    }
                }
                return RedirectToAction("Index", "Home");

            }
        }

        static public bool likesSpanzurat(string email)     
        {                   
            using (DBUsersEntities db = new DBUsersEntities())
            {
                var v = db.Users.FirstOrDefault(a => a.Email == email).Spanzurat;
                if (v == 1)
                {
                    return true;
                }
                return false;
            }
        }

        static public bool likesUrsi(string email)
        {
            using (DBUsersEntities db = new DBUsersEntities())
            {
                var v = db.Users.FirstOrDefault(a => a.Email == email).Ursi;
           
                if (v == 1)
                {
                   
                    return true;
                }
                return false;
            }
        }

        static public bool likesMemo(string email)
        {
            using (DBUsersEntities db = new DBUsersEntities())
            {
                var v = db.Users.FirstOrDefault(a => a.Email == email).Memo;

                if (v == 1)
                {

                    return true;
                }
                return false;
            }
        }

        static public bool likesFlap(string email)
        {
            using (DBUsersEntities db = new DBUsersEntities())
            {
                var v = db.Users.FirstOrDefault(a => a.Email == email).Flap;

                if (v == 1)
                {

                    return true;
                }
                return false;
            }
        }

        static public bool likesInvadez(string email)
        {
            using (DBUsersEntities db = new DBUsersEntities())
            {
                var v = db.Users.FirstOrDefault(a => a.Email == email).Invadez;

                if (v == 1)
                {

                    return true;
                }
                return false;
            }
        }

        static public bool likesSnek(string email)
        {
            using (DBUsersEntities db = new DBUsersEntities())
            {
                var v = db.Users.FirstOrDefault(a => a.Email == email).Snek;

                if (v == 1)
                {

                    return true;
                }
                return false;
            }
        }


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
                var v = db.Jocuris.OrderByDescending(a => a.Nr_accesari);//ForEach(a => System.Diagnostics.Debug.Print(a.Nume));
                System.Collections.Generic.List<Jocuri> l = v.ToList();
                l.ForEach(a => result = result + " " + a.Nume);
                string[] vector = result.Split(' ');
                return (vector[1] + " " + vector[2] + " " + vector[3]);
            }
        }





    }

}