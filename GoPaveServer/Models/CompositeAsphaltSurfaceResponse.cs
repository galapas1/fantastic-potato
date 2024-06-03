using System;
using System.Collections.Generic;
using System.IO;

namespace GoPaveServer.Models
{
    public class CompositeAsphaltResponse
    {
        public AsphaltResult[]      myoneout         { get; set; }
        public AsphaltEquation[,][] Finalres         { get; set; }
        public AsphaltEquation[]    Final_static_res { get; set; }

        public Law      lawinresult                  { get; set; }
        public AxisList axinresult                   { get; set; }
        public Weaslea  myweaslea                    { get; set; }

        public int      loadtype                     { get; set; }
        public int      bytime                       { get; set; }
        public double yeargrowth                     { get; set; }  // in Percent
        public double designyear                     { get; set; }  // How many years you will analysis
        public double[,] lifepredict                 { get; set; }
        public double[] lifebyfail                   { get; set; }

        public double SurfaceThicknessDesign         { get; set; } 
        
        public CompositeAsphaltResponse(string codefile, string dataFileTmpl)
        {
            lawinresult  = new Law();
            axinresult   = new AxisList();
            myweaslea    = new Weaslea(codefile, dataFileTmpl);

            lifepredict      = new double[4, 300];
            Final_static_res = new AsphaltEquation[4];

            loadtype   =  1;
            designyear = 20.0;
            yeargrowth =  5.0;
            bytime     =  3;  // 1 is day  2 is month  =3 is by year
            lifebyfail = new double[10];
        }

        public void preparedata()
        {
            getDepth();

            using (var stream = new FileStream(myweaslea.codefile, FileMode.CreateNew))
            {
                using (StreamWriter mywritfile = new StreamWriter(stream))
                {
                    if (loadtype == 1)
                    {
                        myweaslea.nsys = axinresult.naxis;
                        for (int indx = 0; indx < axinresult.naxis; indx++)
                        {
                            prep_axis(indx);
                            prep_location(indx);
                            myweaslea.CreateDataFile(indx);
                            myweaslea.EncodeDataFile(mywritfile);
                        }
                    }
                    else
                    {
                        throw new ArgumentOutOfRangeException("Load type '" + loadtype + "' not supported");
                    }
                }
            }
        }

        public void AnalysisPrediction(double flevel)
        {
            const double times = 365.0;

            for (int i = 0; i < lawinresult.nequ; i++)
            {
                double sig = 0.0;
                for (int j = 0; j < designyear+10; j++)
                {
                    sig += Final_static_res[i].totaldamage * times;
                    lifepredict[i, j] = sig;
                    if (lifepredict[i, j] > 100.0) lifepredict[i, j] = 100.0;

                }

                if (lifepredict[i, 0] > flevel)
                {
                    lifebyfail[i] = 0.0;
                    if (lifebyfail[i] < 0.0000001)
                    {
                        lifebyfail[i] = flevel / Final_static_res[i].realtotaldamage / 365.0;

                    }
                }
                else if (lifepredict[i, Convert.ToInt16(designyear+10) - 1] > flevel)
                {
                    for (int j = 0; j < designyear+10; j++)
                    {
                        if (lifepredict[i, j] >= flevel)
                        {
                            double xx = flevel - lifepredict[i, j - 1];
                            double yy = lifepredict[i, j] - lifepredict[i, j - 1];
                            yy = xx / yy;
                            lifebyfail[i] = yy + j;
                            break;
                        }
                    }
                }
                else
                {
                    lifebyfail[i] = 1000.0;
                }
            }
        }

        public void AxleAnalysis()
        {
            Finalres = new AsphaltEquation[axinresult.naxis, lawinresult.nequ][];

            for (int j = 0; j < lawinresult.nequ; j++)
            {
                Final_static_res[j] = new AsphaltEquation();
            }

            for(int i = 0; i < axinresult.naxis; i++)
            {
                for(int j = 0; j < lawinresult.nequ; j++)
                {
                    Finalres[i, j]    = new AsphaltEquation[1];
                    Finalres[i, j][0] = new AsphaltEquation();
                }
            }

            int ii = 0;  // ii is the result number

            for (int i = 0; i < axinresult.naxis; i++)
            {
                int n2d = axinresult.inputaxis[i].nload;
                int axletype = 0;
                switch(n2d)
                {
                    case 1:
                        axletype = 0;
                        break;
                    case 4:
                        axletype = 2;
                        break;
                    case 6:
                        axletype = 3;
                        break;
                }

                for(int j = 0; j < lawinresult.nequ; j++)
                {
                    Finalres[i,j][0].axistype = axletype;
                    Finalres[i,j][0].a        = lawinresult.anaequ[j].a;
                    Finalres[i,j][0].b        = lawinresult.anaequ[j].b;
                    Finalres[i, j][0].application = axinresult.inputaxis[i].application;
                    Finalres[i, j][0].depth   = lawinresult.anaequ[j].depth;
                    Finalres[i, j][0].E       = lawinresult.anaequ[j].E;
                    Finalres[i, j][0].typeid  = lawinresult.anaequ[j].typeid;
                    Finalres[i, j][0].ev      = lawinresult.anaequ[j].ev;
                    Finalres[i, j][0].inlayer = lawinresult.anaequ[j].inlayer;
                    Finalres[i, j][0].layerid = lawinresult.anaequ[j].layerid;
                    Finalres[i, j][0].MR      = lawinresult.anaequ[j].MR;
                    Finalres[i, j][0].subtype = lawinresult.anaequ[j].subtype;

                    int i3 = Finalres[i,j][0].typeid;

                    double vvv = -100000.0;
                    if(i3 ==8)
                    {
                        vvv = 100000.0;
                    }

                    Finalres[i, j][0].nlocat = n2d;
                    Finalres[i, j][0].ntire  = axletype;


                    Finalres[i, j][0].strain = new double[n2d];
                    Finalres[i, j][0].strainana = new double[(n2d+1) / 2];
                    Finalres[i, j][0].nfana = new double[(n2d+1) / 2];
                    Finalres[i, j][0].dmgarr = new double[(n2d+1) / 2];

                    int i2 = j * n2d;
                    int i4 = ii+i2;
                    int i1 = -1;

                    for(int k = 0; k < n2d; k++)
                    {
                        switch (i3)
                        {
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                                Finalres[i, j][0].strain[k] = myoneout[i4 + k].Shmax;
                                if(myoneout[i4+k].Shmax>vvv)
                                {
                                    vvv=myoneout[i4+k].Shmax;
                                    i1 = k;
                                }
                                break;

                            case 8:
                                Finalres[i, j][0].strain[k] = -myoneout[i4 + k].Ez;
                                if (myoneout[i4 + k].Ez < vvv)
                                {
                                    vvv=myoneout[i4+k].Ez;
                                    i1 = k;
                                }
                                break;

                            case 9:
                                Finalres[i, j][0].strain[k] = myoneout[i4 + k].Ehmax;
                                if(myoneout[i4+k].Ehmax>vvv)
                                {
                                    vvv=myoneout[i4+k].Ehmax;
                                    i1=k;
                                }
                                break;
                        }
                    }

                    Finalres[i,j][0].locationid   = i1;
                    Finalres[i, j][0].totlocation = i4 + i1;

                    switch (i3)
                    {
                        case 1:
                            Finalres[i, j][0].sigmat = vvv;
                            break;
                        case 2:
                            Finalres[i, j][0].sigmat = vvv;
                            break;
                        case 3:
                            Finalres[i, j][0].sigmat = vvv;
                            break;
                        case 4:
                            Finalres[i, j][0].sigmat = vvv;
                            break;
                        case 5:
                            Finalres[i,j][0].sigmat=vvv;
                            break;
                        case 8:
                            Finalres[i,j][0].ev=vvv;
                            break;
                        case 9:
                            Finalres[i,j][0].et=vvv;
                            break;
                    }
                    Finalres[i, j][0].analysisCombine();
                }
                ii += lawinresult.nequ * n2d ;
            }
        }

        public void FindStatic()
        {
            int nt;
            int na;
            AsphaltEquation sumx  = new AsphaltEquation();
            AsphaltEquation sumxx = new AsphaltEquation();

            if (loadtype == 1)
            {
                nt = axinresult.naxis;
            }
            else
            {
                throw new ArgumentOutOfRangeException("Load type '"+loadtype+"' not supported");
            }

            for (int iq = 0; iq < lawinresult.nequ; iq++)
            {
                sumx.sigmat = 0.0;
                sumx.sigmav = 0.0;
                sumx.nf     = 0.0;
                sumx.et     = 0.0;
                sumx.ev     = 0.0;
                sumx.damage = 0.0;

                sumxx.sigmat = 0.0;
                sumxx.sigmav = 0.0;
                sumxx.nf     = 0.0;
                sumxx.et     = 0.0;
                sumxx.ev     = 0.0;
                sumxx.damage = 0.0;

                int nn = 0;
                for (int i = 0; i < nt; i++)
                {
                    na = 1;
                    for (int j = 0; j < na; j++)
                    {
                        nn++;
                        switch (Finalres[i, iq][j].typeid)
                        {
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                                if (Finalres[i, iq][j].sigmat > 0)
                                {
                                    sumx.sigmat += Finalres[i, iq][j].sigmat;
                                    sumxx.sigmat += Finalres[i, iq][j].sigmat * Finalres[i, iq][j].sigmat;
                                }
                                break;
                            case 8:
                                if (Finalres[i, iq][j].ev < 0)
                                {
                                    sumx.ev += Finalres[i, iq][j].ev * 1000.0;
                                    sumxx.ev += Finalres[i, iq][j].ev * Finalres[i, iq][j].ev * 1000000.0;
                                }
                                break;

                            case 9:

                                if (Finalres[i, iq][j].et > 0)
                                {
                                    sumx.et += Finalres[i, iq][j].et * 1000.0;
                                    sumxx.et += Finalres[i, iq][j].et * Finalres[i, iq][j].et * 1000000.0;
                                }
                                break;
                        }
                        sumx.damage += Finalres[i, iq][j].totaldamage;
                        sumxx.damage += Finalres[i, iq][j].totaldamage * Finalres[i, iq][j].totaldamage;
                    }
                }
                sumx.realtotaldamage  = sumx.damage;
                sumxx.realtotaldamage = sumxx.damage;

                if (sumx.damage > 100.0) sumx.damage = 100.0;
                sumx.totaldamage  = sumx.damage;
                sumxx.totaldamage = sumxx.damage;

                switch (Finalres[0, iq][0].typeid)
                {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        sumx.sigmat /= nn;
                        Final_static_res[iq].sigmat = sumx.sigmat;
                        break;
                    case 8:
                        sumx.ev = sumx.ev / nn / 1000.0;
                        Final_static_res[iq].ev = sumx.ev;
                        break;
                    case 9:
                        sumx.et = sumx.et / nn / 1000.0;
                        Final_static_res[iq].et = sumx.et;
                        break;
                }

                Final_static_res[iq].damage = sumx.totaldamage;
                Final_static_res[iq].totaldamage = sumx.totaldamage;
                Final_static_res[iq].realtotaldamage = sumx.realtotaldamage;
                Final_static_res[iq].realtotaldamage = sumx.realtotaldamage;
            }
        }

        private void getDepth()
        {
            double[] depth = new double[12];
            double sigma = 0.0;

            for (int indx = 0; indx < myweaslea.nlayer; indx++)
            {
                sigma += myweaslea.thick[indx];
                depth[indx] = sigma;
            }

            for (int indx = 0; indx < lawinresult.nequ; indx++)
            {
                int locIndx = lawinresult.anaequ[indx].inlayer;

                if (lawinresult.anaequ[indx].typeid == 8)
                {
                   lawinresult.anaequ[indx].depth = depth[locIndx-1] + 0.001;
                }
                else
                {
                    lawinresult.anaequ[indx].depth = depth[locIndx] - 0.001;
                }
            }
        }

        private const int DATA_LEN = 12;
        private const int COL_1 = 0;
        private const int COL_2 = 12;
        private const int COL_3 = 24;
        private const int COL_4 = 36;
        private const int COL_5 = 48;
        private const int COL_6 = 60;

        public AsphaltResult[] ReadResults(string resultsFile)
        {
            List<AsphaltResult> results = new List<AsphaltResult>();
            try
            {
                using (var stream = new FileStream(resultsFile, FileMode.Open))
                {
                    using (StreamReader mydatfile = new StreamReader(stream))
                    {
                        string line;
                        while ((line = mydatfile.ReadLine()) != null)
                        {
                            AsphaltResult result = new AsphaltResult();

                            line = line.Replace('D', 'E');

                            result.Sx = Convert.ToDouble(line.Substring(COL_1, DATA_LEN));
                            result.Sy = Convert.ToDouble(line.Substring(COL_2, DATA_LEN));
                            result.Sz = Convert.ToDouble(line.Substring(COL_3, DATA_LEN));

                            result.Tyz = Convert.ToDouble(line.Substring(COL_4, DATA_LEN));
                            result.Txz = Convert.ToDouble(line.Substring(COL_5, DATA_LEN));
                            result.Txy = Convert.ToDouble(line.Substring(COL_6, DATA_LEN));

                            line = mydatfile.ReadLine();
                            line = line.Replace('D', 'E');

                            result.Ex = Convert.ToDouble(line.Substring(COL_1, DATA_LEN));
                            result.Ey = Convert.ToDouble(line.Substring(COL_2, DATA_LEN));
                            result.Ez = Convert.ToDouble(line.Substring(COL_3, DATA_LEN));

                            result.TEyz = Convert.ToDouble(line.Substring(COL_3, DATA_LEN));
                            result.TExz = Convert.ToDouble(line.Substring(COL_4, DATA_LEN));
                            result.TExy = Convert.ToDouble(line.Substring(COL_5, DATA_LEN));

                            line = mydatfile.ReadLine();
                            line = line.Replace('D', 'E');

                            result.Ux = Convert.ToDouble(line.Substring(COL_1, DATA_LEN));
                            result.Uy = Convert.ToDouble(line.Substring(COL_2, DATA_LEN));
                            result.Uz = Convert.ToDouble(line.Substring(COL_3, DATA_LEN));

                            line = mydatfile.ReadLine();
                            line = line.Replace('D', 'E');

                            result.S1 = Convert.ToDouble(line.Substring(COL_1, DATA_LEN));
                            result.Eps1 = Convert.ToDouble(line.Substring(COL_2, DATA_LEN));

                            line = mydatfile.ReadLine();
                            line = line.Replace('D', 'E');

                            result.S2 = Convert.ToDouble(line.Substring(COL_1, DATA_LEN));
                            result.Eps2 = Convert.ToDouble(line.Substring(COL_2, DATA_LEN));

                            line = mydatfile.ReadLine();
                            line = line.Replace('D', 'E');

                            result.S3 = Convert.ToDouble(line.Substring(COL_1, DATA_LEN));
                            result.Eps3 = Convert.ToDouble(line.Substring(COL_2, DATA_LEN));

                            line = mydatfile.ReadLine();
                            line = line.Replace('D', 'E');

                            result.T1 = Convert.ToDouble(line.Substring(COL_1, DATA_LEN));
                            result.TE1 = Convert.ToDouble(line.Substring(COL_2, DATA_LEN));

                            line = mydatfile.ReadLine();
                            line = line.Replace('D', 'E');

                            result.T2 = Convert.ToDouble(line.Substring(COL_1, DATA_LEN));
                            result.TE2 = Convert.ToDouble(line.Substring(COL_2, DATA_LEN));

                            line = mydatfile.ReadLine();
                            line = line.Replace('D', 'E');

                            result.T3 = Convert.ToDouble(line.Substring(COL_1, DATA_LEN));
                            result.TE3 = Convert.ToDouble(line.Substring(COL_2, DATA_LEN));

                            line = mydatfile.ReadLine();
                            line = line.Replace('D', 'E');

                            result.Ehmax = result.Ex;
                            if (result.Ex < result.Ey)
                            {
                                result.Ehmax = result.Ey;
                            }

                            result.Shmax = result.Sx;
                            if (result.Sx < result.Sy)
                            {
                                result.Shmax = result.Sy;
                            }

                            results.Add(result);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Program.Trace("The results file could not be read, please check your inputs, ", ex.Message);
                throw new ArgumentException("The results file could not be read, please check your inputs");
            }
            return results.ToArray();
        }

        class XY {
            public double x, y;
        };

        private void prep_location(int id)
        {
            XY[] xy = new XY[6] { new XY(), new XY(), new XY(), new XY(), new XY(), new XY() };

            switch(axinresult.inputaxis[id].nload)
            {
                case 1:
                    xy[0].x = 0.000;
                    xy[0].y = 0.000;
                    break;

                case 4:
                    xy[0].x = 0.000;
                    xy[1].x = 7.000;
                    xy[2].x = 0.000;
                    xy[3].x = 7.000;

                    xy[0].y =  0.000;
                    xy[1].y =  0.000;
                    xy[2].y = 26.500;
                    xy[3].y = 26.500;
                    break;

                case 6:
                    xy[0].x = 0.000;
                    xy[1].x = 7.000;
                    xy[2].x = 0.000;
                    xy[3].x = 7.000;
                    xy[4].x = 0.000;
                    xy[5].x = 7.000;

                    xy[0].y =  0.000;
                    xy[1].y =  0.000;
                    xy[2].y = 26.500;
                    xy[3].y = 26.500;
                    xy[4].y = 53.000;
                    xy[5].y = 53.000;
                    break;
            }

            myweaslea.nloc = lawinresult.nequ * myweaslea.nload;

            int locIndx = 0;
            for(int indx = 0; indx < lawinresult.nequ; indx++)
            {
                for(int iindx = 0; iindx < myweaslea.nload; iindx++)
                {
                    myweaslea.analocat[locIndx].inlayer = lawinresult.anaequ[indx].inlayer;
                    myweaslea.analocat[locIndx].x       = xy[iindx].x;
                    myweaslea.analocat[locIndx].y       = xy[iindx].y;
                    myweaslea.analocat[locIndx].z       = lawinresult.anaequ[indx].depth;
                    myweaslea.analocat[locIndx].forwhat = lawinresult.anaequ[indx].typeid;
                    ++locIndx;
                }
            }
        }

        private void prep_axis(int id)
        {
            myweaslea.nload       = axinresult.inputaxis[id].nload;
            myweaslea.load    [0] = axinresult.inputaxis[id].load;
            myweaslea.loadarea[0] = axinresult.inputaxis[id].loadarea;

            for (int indx = 0; indx < axinresult.inputaxis[id].nload; indx++)
            {
                myweaslea.loadx   [indx] = axinresult.inputaxis[id].loadx[indx];
                myweaslea.loady   [indx] = axinresult.inputaxis[id].loady[indx];
                myweaslea.load[indx] = myweaslea.load[0];
                myweaslea.loadarea[indx] = myweaslea.loadarea[0];
            }
        }
    }
}
