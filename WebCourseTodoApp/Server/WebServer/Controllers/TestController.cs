using System.Web.Http;
using WebServer.Models;

namespace WebServer.Controllers
{
  public class TestController : ApiController
  {
    public Entity Get()
    {
      return new Entity() { Id = 1, Name = "TestName" };
    }
  }
}
