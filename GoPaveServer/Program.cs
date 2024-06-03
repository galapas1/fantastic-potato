using Microsoft.AspNetCore.Hosting;
using System.IO;
using System.Runtime.CompilerServices;
using System;

namespace GoPaveServer
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = new WebHostBuilder()
                .UseKestrel         ()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseIISIntegration  ()
                .UseStartup<Startup>()
                .Build              ();

            host.Run();
        }

        public static void Trace(string message,
                                [CallerFilePath] string file = null,
                                [CallerLineNumber] int line = 0)
        {
            Console.WriteLine("{0} ({1}): {2}", Path.GetFileName(file), line, message);
        }
    }
}
