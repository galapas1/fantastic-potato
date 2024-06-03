using System;

namespace GoPaveServer.Models
{
    public class Axis
    {
        public int      nload    { get; set; }
        public double   load     { get; set; }       
        public double   loadarea { get; set; }
        public double[] loadx    { get; set; }
        public double[] loady    { get; set; }
        public double   application { get; set; }
    }

    public class AxisList
    {
        public Axis[] inputaxis { get; set; }
        public int    naxis     { get; set; }

        public AxisList()
        {
            naxis = 30;
            inputaxis = new Axis[30];

            for (int i = 0; i < naxis; i++)
            {
                inputaxis[i] = new Axis();
            }
        }
    }
}
