using System;

namespace GoPaveServer.Models
{
    public class AsphaltResult
    {
        public double Ux    { get; set; }
        public double Uy    { get; set; }
        public double Uz    { get; set; }
        public double Sx    { get; set; }
        public double Sy    { get; set; }
        public double Sz    { get; set; }
        public double S1    { get; set; }
        public double S2    { get; set; }
        public double S3    { get; set; }
        public double Tyz   { get; set; }
        public double Txz   { get; set; }
        public double Txy   { get; set; }
        public double Ex    { get; set; }
        public double Ey    { get; set; }
        public double Ez    { get; set; }
        public double Eps1  { get; set; }
        public double Eps2  { get; set; }
        public double Eps3  { get; set; }
        public double T1    { get; set; }
        public double T2    { get; set; }
        public double T3    { get; set; }
        public double TE1   { get; set; }
        public double TE2   { get; set; }
        public double TE3   { get; set; }
        public double TEyz  { get; set; }
        public double TExz  { get; set; }
        public double TExy  { get; set; }
        public double Ehmax { get; set; }
        public double Shmax { get; set; }

        public int listloc;  //Tell wwhere is on the array
        public int usage;    //1 for CTB check   2   for RDD  3  for  flex   4 for ruting
        public int inlayer;  //which layer
        public int loadid;   //which load group it is
        public int loadtype; //What kind of load  0=single axle   1=single dule. 2=tedem dule  3=tridem dule
        public int hlocat;   //Horizontal location
        public int vlocat;   //Verticle location
        public int equid;    //which equation is used
        public int truckid;    //which equation is used
        public int axisID;    //which equation is used
        public int serialno;  //No in this file


        public AsphaltResult()
        {
            Ux    = 0.0;
            Uy    = 0.0;
            Uz    = 0.0;
            Sx    = 0.0;
            Sy    = 0.0;
            Sz    = 0.0;
            S1    = 0.0;
            S2    = 0.0;
            S3    = 0.0;
            Tyz   = 0.0;
            Txz   = 0.0;
            Txy   = 0.0;
            Ex    = 0.0;
            Ey    = 0.0;
            Ez    = 0.0;
            Eps1  = 0.0;
            Eps2  = 0.0;
            Eps3  = 0.0;
            T1    = 0.0;
            T2    = 0.0;
            T3    = 0.0;
            TE1   = 0.0;
            TE2   = 0.0;
            TE3   = 0.0;
            TEyz  = 0.0;
            TExz  = 0.0;
            TExy  = 0.0;
            Ehmax = 0.0;
            Shmax = 0.0;

            listloc  = -1;
            usage    = -1;
            inlayer  = -1;
            loadid   = -1;
            loadtype = -1;
            hlocat   = -1;
            vlocat   = -1;
            equid    = -1;
            truckid  = -1;
        }

        public string ToString(int id)
        {
            string st;
            float f = 1000000;
            st = String.Format(@"{0,5:d}:{1,5:d}:{2,5:d}:{3,5:d}:{4,5:d}:{5,5:d}:{6,5:d}:{7,5:d}:{8,5:d}:{9,5:d}:{10,12:f3}:{11,12:f3}{12,12:f3}{13,12:f3}{14,12:f3}{15,12:f3}{16,12:f3}{17,12:f3}",
                              id, listloc, usage, inlayer, loadid, loadtype, hlocat, vlocat, equid, truckid, Ehmax * f, Shmax, Ex * f, Ey * f, Ez * f, Sx, Sy, Sz);
            return st;
        }

    }
}
