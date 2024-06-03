using System;
using System.IO;

namespace GoPaveServer.Models
{
    public class OutLocAt
    {
        public int    inlayer { get; set; }
        public double x       { get; set; }
        public double y       { get; set; }
        public double z       { get; set; }
        public int    forwhat { get; set; }  // =1  for CTB  =2  RCC  =3  for flex  =4 for Rutting

        public OutLocAt()
        {
            inlayer = -1;
            x       = 0.0;
            y       = 0.0;
            z       = 0.0;
            forwhat = -1;
        }
    }

    public class Weaslea
    {
        public string     codefile  { get; set; }
        public string     title     { get; set; }
        public int        nsys      { get; set; }
        public int        nlayer    { get; set; }
        public double[]   mod       { get; set; }
        public double[]   pos       { get; set; }
        public double[]   thick     { get; set; }
        public double[]   oth       { get; set; }
        public int[]      inlayer   { get; set; }
        public int[]      kind      { get; set; }
        public string[]   name      { get; set; }
        public int        nload     { get; set; }
        public double[]   load      { get; set; }
        public double[]   loadarea  { get; set; }
        public double[]   loadx     { get; set; }
        public double[]   loady     { get; set; }
        public string     dftstring { get; set; }
        public int        nloc      { get; set; }
        public OutLocAt[] analocat  { get; set; }

        public int ib1 { get; set; }
        public int ib2 { get; set; }

        private string filename        { get; set; }
        private string fileNameTmpl    { get; set; }

        public Weaslea(string codefile, string datafileTmpl)
        {
            this.codefile     = codefile;
            this.filename     = "";
            this.fileNameTmpl = datafileTmpl;

            this.title      = "Pavement Stress and strain analysis";
            this.dftstring  = "101102103104105106107108109110111112113114115116117118119120121122123124125126127";
            this.nsys       = 30; // 10 Single, 10 Tandem & 10 Tridem
            this.nlayer     = 0;
            this.ib1        = 1;
            this.ib2        = 1;
            this.nload      = 0;
            this.nloc       = 0;
            inimyresult();
        }

        private void inimyresult()
        {
            mod      = new double[12];
            pos      = new double[12];
            thick    = new double[12];
            oth      = new double[12];
            inlayer  = new int   [12];
            kind     = new int   [12];
            name     = new string[12];

            load     = new double[12];
            loadarea = new double[12];
            loadx    = new double[12];
            loady    = new double[12];

            analocat = new OutLocAt[300];

            for (int i = 0; i < 300; i++)
            {
                analocat[i] = new OutLocAt();
            }
        }

        public void CreateDataFile(int iid)
        {
            filename = String.Format(fileNameTmpl, iid);
            using (StreamWriter mydatfile = File.CreateText(filename))
            {
                if (iid == 0)
                {
                    mydatfile.WriteLine(title);
                    //nsys out
                    mydatfile.WriteLine(String.Format("{0,2}", nsys));
                }
                //nlayer out
                mydatfile.WriteLine(String.Format("{0,2}{1,3}{2,1}", nlayer, ib1, ib2));

                //Pavement structure output
                int i = 0;
                for (; i < nlayer - 1; i++)
                {
                    mydatfile.WriteLine(String.Format("{0,12:f2}{1,6:f2}{2,11:f2}{3,8:f1}{4,8:d}{5,5:d}    {6:s}", mod[i], pos[i], thick[i], oth[i], inlayer[i], kind[i], name[i]));
                }
                i = nlayer - 1;
                mydatfile.WriteLine(String.Format("{0,12:f2}{1,6:f2}                   {2,8:d}{3,5:d}    {4:s}", mod[i], pos[i], inlayer[i], kind[i], name[i]));

                //Load out
                mydatfile.WriteLine(String.Format("{0,2}", nload));
                for (i = 0; i < nload; i++)
                {
                    mydatfile.WriteLine(String.Format("{0,4:d}{1,6:d}{2,10:f3}{3,6:f1}{4,6:f1}{5,6:f1}{6,6:f1}", 1000, Convert.ToInt16(load[i]), loadarea[i], loadx[i], loady[i], 0.0, 0.0, 0.0));
                }

                mydatfile.WriteLine(dftstring);

                //Location out
                mydatfile.WriteLine(String.Format("{0,3}", nloc));
                for (i = 0; i < nloc; i++)
                {
                    mydatfile.WriteLine(String.Format("{0,2:d}{1,12:f3}{2,12:f3}{3,12:f3}{4,5:f1}{5,5:d}", analocat[i].inlayer + 1, analocat[i].x, analocat[i].y, analocat[i].z, 0.0, analocat[i].forwhat));
                }

                mydatfile.Flush();
            }
        }

        public void EncodeDataFile(StreamWriter mywritfile)
        {
            try
            {
                using (var stream = new FileStream(filename, FileMode.Open))
                {
                    using (StreamReader mydatfile = new StreamReader(stream))
                    {
                        String line;
                        while ((line = mydatfile.ReadLine()) != null)
                        {
                            line.TrimEnd();
                            int len = line.Length;
                            char[] charray = new char[len];
                            for (int i = 0; i < len; i++)
                            {
                                charray[i] = (char)((int)line[i] - 15);
                            }
                            String tempst = new String(charray);
                            mywritfile.WriteLine(tempst);
                        }
                    }
                }
            }
            catch (Exception e)
            {
                throw new SystemException("err:0107----The file could not be read: " + e.Message);
            }
        }
    }
}
