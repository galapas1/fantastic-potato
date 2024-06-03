using System;

namespace GoPaveServer.Models
{
    public class Law
    {
        public AsphaltEquation[] anaequ       { get; set; }
        public int               nequ         { get; set; }
        public int               arrsize      { get; set; }
        public double[]          dftfaillevel { get; set; }

        public Law()
        {
            arrsize = 6;
            nequ    = 0;
            anaequ       = new AsphaltEquation[arrsize];
            dftfaillevel = new double[10];

            for (int i = 0; i < arrsize; i++)
            {
                anaequ[i] = new AsphaltEquation();
                dftfaillevel[i] = 25.0;
            }
        }

        public double findfaillevelbyid(int id)
        {
            if(id<0 || id > nequ-1) return 0.0;

            switch (anaequ[id].typeid)
            {
                case 1:
                case 2:
                    return dftfaillevel[0];
                case 3:
                case 4:
                    return dftfaillevel[4];
                case 5:
                    return dftfaillevel[1];
                case 8:
                    return dftfaillevel[3];
                case 9:
                    return dftfaillevel[2];
                default:
                    return 0.0;
            }
        }
    }
}
