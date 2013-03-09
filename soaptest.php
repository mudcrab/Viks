<?php
/*$client = new SoapClient('http://192.168.0.142:13337/ingestate/services/gws?wsdl', array(  
            'location' => 'http://192.168.0.142:13337/ingestate/services/gws', 
             'trace' => TRUE, 'soap_version' => SOAP_1_2)  
        );*/
//$client->__soapCall('loginUser', array('username' => 'root', 'password' => 'root'));


$client = new SoapClient('http://192.168.0.142:13337/ingestate/services/gws?wsdl', array
	(
		'soap_version' => SOAP_1_2,

	)
);