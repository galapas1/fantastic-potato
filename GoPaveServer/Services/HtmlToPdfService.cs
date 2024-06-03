using GoPaveServer.Interfaces;
using GoPaveServer.Models;
using iTextSharp.text.html.simpleparser;
using iTextSharp.text.html;
using iTextSharp.text.pdf;
using iTextSharp.text;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;
using System;
using Newtonsoft.Json.Linq;

namespace GoPaveServer.Services
{
    public class HtmlToPdfService : IHtmlToPdfService
    {
        public byte[] HtmlToPdf(Project project, string emailAddress)
        {
            var stream = new MemoryStream();
            var styles = new StyleSheet  ();

            styles.LoadTagStyle(HtmlTags.BODY, HtmlTags.FONT, FontFactory.HELVETICA);

            var document = new Document(PageSize.A4, 50f, 50f, 25f, 25f);
            PdfWriter.GetInstance(document, stream);

            document.AddAuthor("SURGE GoPaveServer");

            BaseFont bfontTinyItalic = BaseFont.CreateFont(BaseFont.COURIER, BaseFont.CP1252, false);
            Font fontTinyItalic = new Font(bfontTinyItalic, 10, Font.ITALIC, BaseColor.Gray);

            Phrase header = new Phrase(DateTime.Now.ToString("yyyy/MM/dd hh:mm:ss tt"), fontTinyItalic);
            document.Header = new HeaderFooter(header, false) {
                Alignment = Element.ALIGN_RIGHT
            };
            Phrase footer = new Phrase("GoPave", fontTinyItalic);
            document.Footer = new HeaderFooter(footer, false) {
                Alignment = Element.ALIGN_CENTER
            };

            document.Open();

            if(File.Exists("Resources/report-tmpl-STREET/logo.png"))
            {
                Image gif = Image.GetInstance(File.OpenRead("Resources/report-tmpl-STREET/logo.png"));
                gif.ScalePercent(40f); gif.SetAbsolutePosition(350f, 655f);
                document.Add(gif);
            }

            var objects = HtmlWorker.ParseToList(
                new StringReader(createHtmlSnippet(project, emailAddress)), styles
            );

            foreach (IElement element in objects)
            {
                document.Add(element);
            }
            document.Close();

            stream.Seek(0, SeekOrigin.Begin);
            byte[] bytes = new byte[stream.Length];

            int indx = 0;
            while( indx < stream.Length)
            {
                bytes[indx++] = Convert.ToByte(stream.ReadByte());
            }
            stream.Dispose();
            return bytes;
        }

        private string createHtmlSnippet(Project project, string emailAddress)
        {
            if (project == null)
            {
                return @"<b>Project Report Generation Failure<b>
                         <br><br>
                         <span style='color:red;font-size:12pt;font-style:italic;font-weight:bold'>
                         <b>Invalid Project ID</b>
                         </span>";
            }

            string templateFilename = "Resources/report-tmpl-" + project.Type + ".html";
            if(!File.Exists(templateFilename))
            {
                return @"<b>Project Report Generation Failure<b>
                         <br><br>
                         <span style='color:red;font-size:12pt;font-style:italic;font-weight:bold'>
                         <b>Server Configuration Error, missing report template for project type</b>
                         <b>" + templateFilename + "</b></span>";
            }

            string reportHtmlSnippet = System.IO.File.ReadAllText(templateFilename);

            reportHtmlSnippet = caseInsenstiveReplace(reportHtmlSnippet, "@{ProjectName}",        project.Name       );
            reportHtmlSnippet = caseInsenstiveReplace(reportHtmlSnippet, "@{ProjectDescription}", project.Description);
            reportHtmlSnippet = caseInsenstiveReplace(reportHtmlSnippet, "@{Username}",           emailAddress       );
            reportHtmlSnippet = caseInsenstiveReplace(reportHtmlSnippet, "@{ProjectDesign}",      "Pending"          );

            JObject body = JObject.Parse(project.Body);
            Dictionary<string, object> values = body.ToObject<Dictionary<string, object>>();
            foreach(KeyValuePair<string, object> kvp in values)
            {
                reportHtmlSnippet = caseInsenstiveReplace(reportHtmlSnippet,
                                                          "@{" + kvp.Key + "}",
                                                          kvp.Value.ToString());
            }
            return reportHtmlSnippet;
        }

        private string caseInsenstiveReplace(string haystack, string needle, string value)
        {
            Regex regEx = new Regex(needle, RegexOptions.IgnoreCase |
                                            RegexOptions.Multiline);
            return regEx.Replace(haystack, value);
        }
    }
}
