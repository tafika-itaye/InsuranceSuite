
const IS = {
  user: { name:"Tafika Itaye", email:"admin@insuresuite.mw", role:"Admin", initials:"TI" },
  policies:[
    {id:"POL-2026-001",customer:"Chisomo Banda",type:"Motor",premium:"MK 84,000",status:"active",start:"2026-01-10",end:"2026-12-10"},
    {id:"POL-2026-002",customer:"Grace Phiri",type:"Life",premium:"MK 120,000",status:"active",start:"2026-02-01",end:"2031-02-01"},
    {id:"POL-2026-003",customer:"Limbani Mwale",type:"Property",premium:"MK 210,000",status:"pending",start:"2026-04-01",end:"2027-03-31"},
    {id:"POL-2026-004",customer:"Tadala Chirwa",type:"Health",premium:"MK 65,000",status:"active",start:"2026-03-15",end:"2027-03-15"},
    {id:"POL-2026-005",customer:"Kondwani Nyasulu",type:"Travel",premium:"MK 28,000",status:"pending",start:"2026-04-20",end:"2026-06-20"},
    {id:"POL-2026-006",customer:"Alinafe Tembo",type:"Motor",premium:"MK 76,000",status:"active",start:"2025-11-01",end:"2026-10-31"},
  ],
  claims:[
    {id:"CLM-001",policy:"POL-2026-001",customer:"Chisomo Banda",type:"Motor Accident",amount:"MK 340,000",status:"pending",filed:"2026-03-20"},
    {id:"CLM-002",policy:"POL-2026-004",customer:"Tadala Chirwa",type:"Hospitalisation",amount:"MK 95,000",status:"approved",filed:"2026-02-14"},
    {id:"CLM-003",policy:"POL-2026-002",customer:"Grace Phiri",type:"Critical Illness",amount:"MK 500,000",status:"pending",filed:"2026-04-01"},
    {id:"CLM-004",policy:"POL-2026-006",customer:"Alinafe Tembo",type:"Theft",amount:"MK 180,000",status:"rejected",filed:"2026-01-30"},
  ],
  customers:[
    {id:"C-001",name:"Chisomo Banda",email:"c.banda@email.mw",phone:"+265 991 111 222",policies:2,status:"active"},
    {id:"C-002",name:"Grace Phiri",email:"g.phiri@email.mw",phone:"+265 882 333 444",policies:1,status:"active"},
    {id:"C-003",name:"Limbani Mwale",email:"l.mwale@email.mw",phone:"+265 777 555 666",policies:1,status:"pending"},
    {id:"C-004",name:"Tadala Chirwa",email:"t.chirwa@email.mw",phone:"+265 991 777 888",policies:1,status:"active"},
    {id:"C-005",name:"Kondwani Nyasulu",email:"k.nyasulu@email.mw",phone:"+265 882 999 000",policies:1,status:"pending"},
    {id:"C-006",name:"Alinafe Tembo",email:"a.tembo@email.mw",phone:"+265 991 234 567",policies:2,status:"active"},
  ],
  brokers:[
    {id:"B-001",name:"Sunrise Insurance Brokers",contact:"Mr. Pemba",phone:"+265 1 820 100",policies:24,commission:"MK 480,000",status:"active"},
    {id:"B-002",name:"Lakeview Financial Services",contact:"Ms. Kumwenda",phone:"+265 1 831 200",policies:18,commission:"MK 360,000",status:"active"},
    {id:"B-003",name:"Plateau Advisory Group",contact:"Mr. Chilima",phone:"+265 1 755 300",policies:9,commission:"MK 180,000",status:"active"},
  ]
};
