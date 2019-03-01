using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;
using WebServer.Models;

namespace WebServer.Controllers
{
  public class TodoController : ApiController
  {
    // GET: api/Todo
    public IEnumerable<Todo> Get()
    {
      return Todos.Instance;
    }

    // GET: api/Todo/5
    public Todo Get(int id)
    {
      return Todos.Instance.Find(t => t.id == id);
    }

    // POST: api/Todo
    public int Post([FromBody]Todo value)
    {
      return Todos.Instance.Add(value.text, value.highImportance);
    }

    // PUT: api/Todo
    public bool Put([FromBody]Todo value)
    {
      Todo todo = Todos.Instance.Find(t => t.id == value.id);
      if (todo != null)
      {
        todo.text = value.text;
        todo.highImportance = value.highImportance;
        todo.completed = value.completed;
        return true;
      }
      return false;
    }

    // DELETE: api/Todo/5
    public bool Delete(int id)
    {
      return (Todos.Instance.RemoveAll(t => t.id == id) > 0);
    }
  }
}