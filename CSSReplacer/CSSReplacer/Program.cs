using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSSReplacer
{
  class Program
  {
    static void SearchCss(string sDir, List<FileInfo> fileNames)
    {
      foreach (string d in Directory.GetDirectories(sDir))
      {
        foreach (string f in Directory.GetFiles(d))
        {
          FileInfo fileInfo = new FileInfo(f);
          if (fileInfo.Extension == ".css")
            fileNames.Add(fileInfo);
        }
        SearchCss(d, fileNames);
      }
    }

    class VariableReplace
    {
      public string Old { get; set; }
      public string New { get; set; }
      public string FoundInFile { get; set; }
      public bool IsUsed { get; set; }
    }

    class Variables : List<VariableReplace> { }


    /*
     Make
     --variable:
     var(--variable)
     var(--variable, )
    */

    static void FindIncorrectVariables(FileInfo fileInfo, Variables incorrectVariables)
    {
      string shortFileName = fileInfo.Name.Replace(fileInfo.Extension, string.Empty);
      if (shortFileName.StartsWith("theme-"))
        shortFileName = "theme";

      using (var file = new System.IO.FileStream(fileInfo.FullName,
        System.IO.FileMode.Open, System.IO.FileAccess.Read,
        System.IO.FileShare.Read))
      using (var textReader = new System.IO.StreamReader(file))
      {
        while (!textReader.EndOfStream)
        {
          var currentLine = textReader.ReadLine();
          if (currentLine.TrimStart(' ').StartsWith("--"))
          {
            int startIndex = currentLine.IndexOf("--");
            int endIndex = currentLine.IndexOf(":");
            var variable = currentLine.Substring(startIndex, endIndex - startIndex);
            // убрать rx-
            if (variable.Contains("rx-"))
              incorrectVariables.Add(
                new VariableReplace() { Old = variable, New = variable.Replace("rx-", ""), FoundInFile = fileInfo.FullName });
            else if (variable.Contains("fontFamily"))
              incorrectVariables.Add(
                new VariableReplace() { Old = variable, New = variable.Replace("fontFamily", "font-family"), FoundInFile = fileInfo.FullName });
            else if (variable.Contains("fontSize"))
              incorrectVariables.Add(
                new VariableReplace() { Old = variable, New = variable.Replace("fontSize", "font-size"), FoundInFile = fileInfo.FullName });
            else if (variable.Contains("fontWeight"))
              incorrectVariables.Add(
                new VariableReplace() { Old = variable, New = variable.Replace("fontWeight", "font-weight"), FoundInFile = fileInfo.FullName });
            // --module-var -> module_var
            else if (variable.StartsWith("--" + shortFileName + "-"))
              incorrectVariables.Add(
                new VariableReplace() { Old = variable, New = variable.Replace("--" + shortFileName + "-", "--" + shortFileName + "_"), FoundInFile = fileInfo.FullName });
            // --var -> module_var
            else if (!variable.StartsWith("--" + shortFileName + "_"))
              incorrectVariables.Add(
                new VariableReplace() { Old = variable, New = variable.Replace("--", "--" + shortFileName + "_"), FoundInFile = fileInfo.FullName });
            /*else if (variable.Contains("_"))
              incorrectVariables.Add(new VariableReplace() { Old = variable, New = variable.Replace("_", "-"), FoundInFile = fileInfo.FullName });*/
          }
        }
      }
    }

    static void ReplaceVariable(VariableReplace variable, List<FileInfo> files)
    {
      foreach (var fileInfo in files)
      {
        bool hasChanges = false;

        var x = new FileInfo(fileInfo.FullName + "~");
        if (x.Exists)
          x.Delete();

        using (var inputFile = new System.IO.FileStream(fileInfo.FullName,
          System.IO.FileMode.Open, System.IO.FileAccess.Read,
          System.IO.FileShare.Read))
        using (var outputFile = new System.IO.FileStream(fileInfo.FullName + "~",
          System.IO.FileMode.CreateNew, System.IO.FileAccess.Write))
        using (var textReader = new System.IO.StreamReader(inputFile))
        using (var textWriter = new System.IO.StreamWriter(outputFile))
        {
          while (!textReader.EndOfStream)
          {
            var currentLine = textReader.ReadLine();
            var newLine = currentLine
              .Replace(variable.Old + ":", variable.New + ":")
              .Replace("var(" + variable.Old + ")", "var(" + variable.New + ")")
              .Replace("var(" + variable.Old + ",", "var(" + variable.New + ",");
            if (!currentLine.Equals(newLine))
              hasChanges = true;
            textWriter.WriteLine(newLine);
          }
        }
        if (hasChanges)
        {
          new FileInfo(fileInfo.FullName + "~").CopyTo(fileInfo.FullName, true);
        }
        (new FileInfo(fileInfo.FullName + "~")).Delete();
      }
    }

    static void FindAllVariables(FileInfo fileInfo, Variables allVariables)
    {
      string shortFileName = fileInfo.Name.Replace(fileInfo.Extension, string.Empty);

      using (var file = new System.IO.FileStream(fileInfo.FullName,
        System.IO.FileMode.Open, System.IO.FileAccess.Read,
        System.IO.FileShare.Read))
      using (var textReader = new System.IO.StreamReader(file))
      {
        while (!textReader.EndOfStream)
        {
          var currentLine = textReader.ReadLine();
          if (currentLine.TrimStart(' ').StartsWith("--"))
          {
            int startIndex = currentLine.IndexOf("--");
            int endIndex = currentLine.IndexOf(":");
            var variable = currentLine.Substring(startIndex, endIndex - startIndex);

            allVariables.Add(new VariableReplace() { Old = variable, New = "", FoundInFile = fileInfo.FullName, IsUsed = false });
          }
        }
      }
    }

    static void CheckVariables(Variables variables, List<FileInfo> files)
    {
      foreach (var fileInfo in files)
      {
        using (var inputFile = new System.IO.FileStream(fileInfo.FullName,
          System.IO.FileMode.Open, System.IO.FileAccess.Read,
          System.IO.FileShare.Read))
        using (var textReader = new System.IO.StreamReader(inputFile))
        {
          while (!textReader.EndOfStream)
          {
            var currentLine = textReader.ReadLine();
            int startIndex = 0;
            int endIndex = -1;
            char[] chars = { ')', ',' };
            // int varCount = 0;
            while (startIndex > -1)
            {
              startIndex = currentLine.IndexOf("var(", startIndex);
              if (startIndex > -1)
              {

                startIndex = startIndex + 4;
                endIndex = currentLine.IndexOfAny(chars, startIndex);
                var currentVariable = currentLine.Substring(startIndex, endIndex - startIndex);

                int vIndex = variables.FindIndex(t => t.Old == currentVariable);
                if (vIndex == -1)
                  Console.WriteLine("Used unknown variable\t" + currentVariable + "\t" + fileInfo.FullName);
                else
                  variables[vIndex].IsUsed = true;
              }
            }
          }
        }
      }
    }

    static void CheckResultFile(string fileName)
    {
      string currentLine = "";
      string previousLine = "";
      string previousVariable = "";
      string currentVariable = "";

      using (var inputFile = new System.IO.FileStream(fileName,
        System.IO.FileMode.Open, System.IO.FileAccess.Read,
        System.IO.FileShare.Read))
      using (var textReader = new System.IO.StreamReader(inputFile))
      {
        while (!textReader.EndOfStream)
        {
          previousLine = currentLine;
          previousVariable = currentVariable;

          currentLine = textReader.ReadLine();

          if (currentLine.Contains(":"))
          {
            currentVariable = currentLine.Substring(0, currentLine.IndexOf(":"));

            if (!string.IsNullOrWhiteSpace(currentVariable) && !currentVariable.Contains(".") && (currentVariable == previousVariable))
            {
              Console.WriteLine(
                (previousLine.Contains("--theme") ? string.Empty : "!!!!") + currentVariable);

              Console.WriteLine("\t" + previousLine);
              Console.WriteLine("\t" + currentLine);
            }
          }
          else
            currentVariable = string.Empty;
        }
      }
    }

    static void Main(string[] args)
    {
      List<FileInfo> files = new List<FileInfo>();

      SearchCss(@"D:\Projects\Sungero\Web\src\SungeroClient.Web\src", files);

      // Замена переменных.

      // Убираем theme-dark.css и theme.css.
      // files.Remove(files.Find(t => t.Name == "theme-night.css"));
      // files.Remove(files.Find(t => t.Name == "theme.css"));

     /* Variables incorrectVariables = new Variables();
      foreach (var file in files)
      {
        FindIncorrectVariables(file, incorrectVariables);
      }
      if (incorrectVariables.Count > 0)
      {
        //Console.WriteLine("~~~~~~~~~~~~~~~~~~ " + file.Name + " ~~~~~~~~~~~~~~~~");
        foreach (var x in incorrectVariables)
        {
          Console.WriteLine(x.Old + "\t" + x.New);
        }
      }
      
      foreach (VariableReplace vr in incorrectVariables)
      {
        Console.WriteLine();
        Console.WriteLine(vr.Old + "\t" + vr.New + "\t" + vr.FoundInFile);
        var s = Console.ReadLine();
        if (s == "q")
          return;
        else
        {
          var vr2 = vr;
          if (s.StartsWith("--"))
            vr2.New = s;

          ReplaceVariable(vr2, files);
          Console.WriteLine("Replace " + vr2.Old + " with \t" + vr2.New);
        }
      }*/

      // Чек - необъявленные переменные, неиспользуемые переменные.

      files.Remove(files.Find(t => t.Name == "theme-night.css"));
      Variables allVariables = new Variables();
      foreach (var file in files)
        FindAllVariables(file, allVariables);

      CheckVariables(allVariables, files);

      Console.WriteLine();

      /*foreach (var variable in allVariables)
        Console.WriteLine(variable.Old);*/

      foreach (var variable in allVariables.Where(t => !t.IsUsed))
        Console.WriteLine("Unused variable " + variable.Old + "\t" + variable.FoundInFile);

      //Console.WriteLine();

      /*foreach (var variable in allVariables.Where(t => t.Old.Contains("_")))
        Console.WriteLine("Incorrect variable name " + variable.Old + "\t" + variable.FoundInFile);*/

      /*Console.WriteLine("All variables");

      foreach (var variable in allVariables.Where(t => true))
        Console.WriteLine(variable.Old 
        //+ "\t" + variable.FoundInFile*
        );*/


      //CheckResultFile(@"D:\Projects\Sungero\Web\src\SungeroClient.Host\content\appStyles_3.1.0.0000.css");

      Console.ReadKey();
    }
  }
}
