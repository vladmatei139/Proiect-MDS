using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Proiect_mds.Models;
using System.Web.Security;

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
    }

}