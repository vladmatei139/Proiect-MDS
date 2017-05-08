using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Incercare.Startup))]
namespace Incercare
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
