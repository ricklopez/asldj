using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;


namespace QQKraken.Model
{
    public class CatalysePeriod
    {
        public int PeriodId { get; set; }
        public string PeriodValue { get; set; }
        public string PeriodName { get; set; }
    }
}