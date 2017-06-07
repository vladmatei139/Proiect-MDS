using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Proiect_mds.Controllers;
using Proiect_mds.Models;
using System.Web.Mvc;
using System.Data.Entity;

namespace UnitTests.Tests
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestReturnareView()
        {
            var controller = new HomeController();
            var result = controller.Flappy() as ViewResult;
            Assert.AreEqual("Flappy", result.ViewName);
        }

        [TestMethod]
        public void testareInserareUser()
        {
            DBUsersEntities db = new DBUsersEntities();
            int count = db.Users.SqlQuery("Select * From Users").CountAsync().Result;
            User testUser = new User
            {
                Email = "Unsirdecaractereintreghilimele",
                Password = "cisco54321"
            };
            db.Users.Add(testUser);
            db.SaveChanges();
            int count2 = db.Users.SqlQuery("Select * From Users").CountAsync().Result;
            Assert.AreEqual(count + 1, count2);
        }


        [TestMethod]
        public void TestareCelMaiJucatJoc()
        {
            DBUsersEntities1 db = new DBUsersEntities1();
            string joc1 = db.Jocuris.SqlQuery("Select nume From Jocuri").FirstOrDefaultAsync().Result.ToString();
            string joc2 = JocController.Primul();
           /* if (joc1 == "Spanzurat")
                joc1 = " Spanzuratoarea  ";
            else
                        if (joc1 == "Ursi")
                joc1 = " Ursuleti  ";
            else
                        if (joc1 == "Memo")
                joc1 = " Memory Game  ";
            else
                        if (joc1 == "Invadez")
                joc1  = " Space Invaders  ";
            else
                        if (joc1 == "Flap")
                joc1  = " Flappy Bird  ";
            else
                if (joc1 == "Snek")
                joc1  = " Snake  ";*/
            Assert.AreEqual(joc1, joc2);
        }
    }
}
