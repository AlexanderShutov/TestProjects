using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace WebServer.Models
{
  public class Todos: List<Todo>
  {
    private int maxId = 0;
    private static readonly Todos instance = new Todos();

    private Todos()
    {
      this.Add(new Todo() { id = 1, text = "Посетить стоматолога", highImportance = true });
      this.Add(new Todo() { id = 2, text = "Сделать прививки", highImportance = true, completed = true });
      this.Add(new Todo() { id = 3, text = "Определиться со стоянкой для машины" });
      this.Add(new Todo() { id = 4, text = "Продумать маршрут в аэропорт", highImportance = false, completed = true });
      this.Add(new Todo() { id = 5, text = "Оплатить счета(телефон, коммуналка)", highImportance = true });
      this.maxId = 5;
    }

    public int Add(string text, bool highImportance)
    {
      this.maxId++;

      Todo newTodo = new Todo() { id = this.maxId };
      newTodo.text = text;
      newTodo.highImportance = highImportance;

      this.Add(newTodo);

      return newTodo.id;
    }

    public static Todos Instance
    {
      get
      {
        return instance;
      }
    }
  }
}