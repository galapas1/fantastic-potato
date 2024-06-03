using System;

namespace GoPaveServer.Models
{
    public class AsphaltEquation
    {
        public double   sigmat          { get; set; }
        public double   sigmav          { get; set; }
        public double   a               { get; set; }
        public double   b               { get; set; }
        public double   c               { get; set; }
        public double   MR              { get; set; }
        public double   et              { get; set; }
        public double   ev              { get; set; }
        public double   E               { get; set; }
        public int      typeid          { get; set; }  // 1 = CTB1, 2 = CTB2, 5 = RCC, 8 = Rutting, 9 = Fatigue
        public double   nf              { get; set; }
        public int      layerid         { get; set; }
        public int      inlayer         { get; set; }
        public double   depth           { get; set; } // for calulate the weaslea
        public double   damage          { get; set; }
        public double   application     { get; set; }
        public int      axistype        { get; set; }
        public int      locationid      { get; set; }
        public int      totlocation     { get; set; }
        public string   name            { get; set; }
        public double[] strain          { get; set; }
        public double[] dmgarr          { get; set; }
        public int      nlocat          { get; set; }
        public int      ntire           { get; set; }
        public double[] strainana       { get; set; }
        public double[] nfana           { get; set; }
        public double   nftotal         { get; set; }
        public double   totaldamage     { get; set; }
        public double   realtotaldamage { get; set; }
        public int      subtype         { get; set; }

        public AsphaltEquation()
        {
            sigmat  = 0.0;
            sigmav  = 0.0;
            a       = 0.0;
            b       = 0.0;
            MR      = 0.0;
            et      = 0.0;
            ev      = 0.0;
            E       = 0.0;
            typeid  = -1;
            nf      = 0.0;
            layerid = 1;
            inlayer = -1;
            subtype = 1;
        }

        public void iniparameters()
        {
            ininame();
            switch (typeid)
            {
                case 1:
                    sigmat = 3.0;
                    a      = 1.0645;
                    b      = 0.9003;
                    MR     = 200.0;
                    break;
                case 2:
                    sigmat = 3.0;
                    a      = 1.1368;
                    b      = 1.0259;
                    MR     = 200.0;
                    break;
                case 3:
                    sigmat = 3.0;
                    a      = 1.8985;
                    b      = 2.5580;
                    MR     = 200.0;
                    break;
                case 4:
                    sigmat = 3.0;
                    a      = 2.1154;
                    b      = 0.6052;
                    MR     = 200.0;
                    break;
                case 5:
                    sigmat = 3.0;
                    MR     = 200.0;
                    break;
                case 8:
                    a    = 1.365E-9;
                    b    = 4.447;
                    ev   = -20.0;
                    break;
                case 9:
                    a    = 0.0796;
                    b    = 3.291;
                    c    = 0.854;
                    E    = 800.0;
                    et   = 3.0;
                    break;
            }
        }

        private void ininame()
        {
            switch (typeid)
            {
                case 1:
                    name = "NCHRP CTB";
                    break;
                case 2:
                    name = "Exponent CTB";
                    break;
                case 3:
                    name = "NCHRP CMS";
                    break;
                case 4:
                    name = "Exponent CMS";
                    break;
                case 5:
                    name = "RCC Fatigue";
                    break;
                case 8:
                    name = "Subgrade rutting";
                    break;
                case 9:
                    name = "Asphalt Fatigue";
                    break;
            }
        }

        public double analysis()
        {
            double db = 0.0;
                double SR = 0.0;

            switch (typeid)
            {
                case 1:
                    if (sigmat <= 0.0)
                    {
                        db = 300.0;
                    }
                    else
                    {
                        db = (0.972 * 1.0645 - sigmat / MR) / 0.0825 / 0.9003;
                        db = Math.Pow(10.0, db) / 1000000.0;
                    }
                    strainana[0] = sigmat;
                    name = "NCHRP 1-37A CTB Check";
                    break;

                case 3:
                    if (sigmat <= 0.0)
                    {
                        db = 300.0;
                    }
                    else
                    {
                        db = (0.972 * 1.8985 - sigmat / MR) / 0.0825 / 2.558;
                        db = Math.Pow(10.0, db) / 1000000.0;
                    }
                    strainana[0] = sigmat;
                    name = "NCHRP 1-37A CMS Check";
                    break;

                case 5:
                    if (sigmat <= 0.0)
                    {
                        db = 300.0;
                    }
                    else
                    {                      

                            SR = sigmat / MR;
                            if (SR <= 0.45)
                            {
                                db = 300.0;
                            }
                            else if (SR >= 0.55)
                            {
                                db = (11.737 - 12.077 * sigmat / MR);
                                db = Math.Pow(10.0, db) / 1000000.0;
                            }
                            else
                            {
                                db = Math.Pow(4.2577 / (SR - 0.4325), 3.268) / 1000000.0;
                            }                                         
                        
                    }

                    strainana[0]=sigmat;

                    name = "RCC Fatigue Check";
                    break;

                case 8:
                    if (ev >= 0.0)
                    {
                        db = 300.0;
                    }
                    else
                    {
                        db = 1.365 * 0.000000001 * Math.Pow(Math.Abs(ev), -4.47) / 1000000.0;
                    }
                    strainana[0] = ev;

                    name = "Subgrade rutting Check";
                    break;

                case 9:
                    if (et <= 0.0)
                    {
                        db = 300.0;
                    }
                    else
                    {
                        db = 0.0796 * Math.Pow(et, -3.291) * Math.Pow(E * 1.0, -0.854) / 1000000.0;
                    }
                    strainana[0] = et;

                    name = "Asphalt Fatigue Check";
                    break;
            }

            nf = db;
            if (nf > 300.0) nf = 300.0;
            if (Math.Abs(nf - 300.0) < 1.0)
            {
                damage = 0.0;
            }
            else
            {
                damage = application / nf / 10000.0;                 
            }
            nfana[0] = nf;
            nftotal = nf;

            if (damage > 100.0)
            {
                damage = 100.0;
            }
            return db;
        }

        private double analysisbytype(int mytype, double mystress)
        {
            double db = 0.0;
            double SR = 0.0;

            switch (mytype)
            {
                case 1:
                    if (mystress <= 0.0)
                    {
                        db = 300.0;
                    }
                    else
                    {
                        db = (0.972 * a - mystress / MR) / 0.0825 / b;
                        db = Math.Pow(10.0, db) / 1000000.0;
                    }
                    break;
                case 2:
                    if (mystress <= 0.0)
                    {
                        db = 300.0;
                    }
                    else
                    {
                        db = (0.972 * a - mystress / MR) / 0.0825 / b;
                        db = Math.Pow(10.0, db) / 1000000.0;
                    }
                    {
                        db = Math.Pow((a * MR / mystress), 20.0 * b) / 1000000.0;
                    }
                    break;
                case 3:
                    if (mystress <= 0.0)
                    {
                        db = 300.0;
                    }
                    else
                    {
                        db = (0.972 * a - mystress / MR) / 0.0825 / b;
                        db = Math.Pow(10.0, db) / 1000000.0;
                    }
                    break;
                case 4:
                    if (mystress <= 0.0)
                    {
                        db = 300.0;
                    }
                    else
                    {
                        db = (0.972 * a - mystress / MR) / 0.0825 / b;
                        db = Math.Pow(10.0, db) / 1000000.0;
                    }
                    {
                        db = Math.Pow((a * MR / mystress), 20.0 * b) / 1000000.0;
                    }
                    break;

                case 5:
                    if (mystress <= 0.0)
                    {
                        db = 300.0;
                    }
                    else
                    {
                        
                            SR = mystress / MR;
                            if (SR <= 0.45)
                            {
                                db = 300.0;
                            }
                            else if (SR >= 0.55)
                            {
                                db = (11.737 - 12.077 * mystress / MR);
                                db = Math.Pow(10.0, db) / 1000000.0;
                            }
                            else
                            {
                                db = Math.Pow(4.2577 / (SR - 0.4325), 3.268) / 1000000.0;
                            }
                       
                    }
                    break;

                case 8:
                    if (mystress >= 0.0)
                    {
                        db = 300.0;
                    }
                    else
                    {
                        db = 1.365 * 0.000000001 * Math.Pow(Math.Abs(mystress), -4.47) / 1000000.0;
                    }
                    break;

                case 9:
                    if (mystress <= 0.0)
                    {
                        db = 300.0;
                    }
                    else
                    {
                        db = 0.0796 * Math.Pow(mystress, -3.291) * Math.Pow(E * 1.0, -0.854) / 1000000.0;
                    }
                    break;
            }
            if (db > 300.0) db = 300.0;
            return db;
        }

        private double cal_damage(double mynf)
        {
            double mydamage = 0.0;

            if (mynf > 300.0) mynf = 300.0;
            if (Math.Abs(mynf - 300.0) < 1.0)
            {
                mydamage = 0.0;
            }
            else
            {
                mydamage = application / mynf / 10000.0;
            }
            if (mydamage > 100.0) mydamage = 100.0;

            return mydamage;
        }

        public double analysisCombine()
        {
            double db = 0.0;
            double d1, d2, d3;
            double dd, ddd;

            analysis();

            if (axistype <= 1)
            {
                totaldamage = damage;
                return 0.0;
            }

            switch (axistype)
            {
                case 2:
                    d1 = strain[3];
                    if (strain[3] < strain[2])
                    {
                        d1 = strain[2];
                    }

                    strainana[0] = d1;
                    dd = strain[1];

                    if (strain[1] > strain[0])
                    {
                        dd = strain[0];
                    }

                    strainana[1] = dd;

                    if (dd > 0)
                    {
                        d2 = d1 - dd;
                    }
                    else
                    {
                        d2 = d1;
                    }

                    if (typeid == 8)
                    {
                        strainana[0] = -strainana[0];
                        strainana[1] = -strainana[1];
                        d1 = -d1;
                        d2 = -d2;
                    }

                    nfana[0] = analysisbytype(typeid, d1);
                    nfana[1] = analysisbytype(typeid, d2);
                    dmgarr[0] = cal_damage(nfana[0]);
                    dmgarr[1] = cal_damage(nfana[1]);

                    totaldamage = dmgarr[0] + dmgarr[1];
                    break;

                case 3:
                    d1 = strain[5];

                    if (strain[5] < strain[4])
                    {
                        d1 = strain[4];
                    }

                    strainana[0] = d1;
                    dd = strain[2];

                    if (strain[2] > strain[3])
                    {
                        dd = strain[3];
                    }

                    strainana[1] = dd;
                    ddd = strain[1];

                    if (strain[1] < strain[0])
                    {
                        ddd = strain[0];
                    }

                    strainana[2] = ddd;

                    if (strainana[1] < 0)
                    {
                        d2 = strainana[0];
                        d3 = strainana[2];
                    }
                    else
                    {
                        d2 = strainana[0] - strainana[1];
                        d3 = strainana[2] - strainana[1];
                    }

                    if (typeid == 8)
                    {
                        strainana[0] = -strainana[0];
                        strainana[1] = -strainana[1];
                        strainana[2] = -strainana[2];
                        d1 = -d1;
                        d2 = -d2;
                        d3 = -d3;
                    }

                    nfana[0] = analysisbytype(typeid, d1);
                    nfana[1] = analysisbytype(typeid, d2);
                    nfana[2] = analysisbytype(typeid, d3);

                    if (Math.Abs(nfana[1] + nfana[2] - 600.0) < 2.0)
                    {
                        d1 = strainana[2];
                        nfana[0] = analysisbytype(typeid, d1);
                    }

                    dmgarr[0] = cal_damage(nfana[0]);
                    dmgarr[1] = cal_damage(nfana[1]);
                    dmgarr[2] = cal_damage(nfana[2]);

                    totaldamage = dmgarr[0] + dmgarr[1] + dmgarr[2];
                    break;
            }
            return db;
        }
    }
}
