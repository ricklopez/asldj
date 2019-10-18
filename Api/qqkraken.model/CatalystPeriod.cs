using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;


namespace qqkraken.model
{
    public class CatalysePeriod
    {
        public int Id { get; set; }
        public string PeriodValue { get; set; }
        public string PeriodName { get; set; }
    }
}