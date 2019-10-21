using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;


namespace QQKraken.Model
{
    public class CatalystLOB
    {
        public int LOBId { get; set; }
        public string LOB { get; set; }
        public string InternalCode { get; set; }
    }
}