namespace WebServer.Models
{
  public class Todo
  {
    public int id { get; set; }

    public string text { get; set; }

    public bool completed { get; set; }

    public bool highImportance { get; set; }
  }
}

