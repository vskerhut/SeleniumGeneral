import { OnInit, Component, Input, Output } from '@angular/core';
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, ResponseOptions, RequestOptions, RequestOptionsArgs, Request, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Employee } from '../model/employee';
import { Project } from '../model/project';
import { EmployeeProjectAssoc } from '../model/employee_project_assoc';
import { ChargeCode } from '../model/chargecode';
import {Contact} from '../model/contact';
 import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class ProjectService {
    body: string;
    baseURL: string;
    res: Object;

    constructor( private http: Http ) {
        var obj;
        this.http = http;
        this.baseURL = 'http://localhost:8052/api/v1/project/';
    }
    ngOnInit() {

    }

    private extractData( res: Response ) {
        let body;
        if ( res.text() ) {
            body = res.json();
        }

        return body || {};
    }
    public addProject( name: string, manager: string, charge_code: string ) {
        console.log( "adding project %s", name )
        let headers = new Headers( { "Content-Type": "application/json" } );
        let options = new RequestOptions( { headers: headers } );
        return this.http.post( this.baseURL + 'create',
            JSON.stringify( { Project_Name: name } ),
            options ).map(( res: Response ) => <Project>res.json() )
            .catch( this.handleError )

    }



    public getAllUnassignedEmployee(): Observable<Array<Employee>> {
        console.log( "Retrieving all unsigned employees." )
        return this.http.get( this.baseURL + 'employee/unassigned/get' )
            .map(( ress: Response ) => <Array<Employee>>ress.json() )
            .catch( this.handleError );
    }

    public getAllProjects(): Observable<Array<Project>> {
        console.log( "Retrieving list of all projects." )
        return this.http.get( this.baseURL + 'projects/get' )
            .map(( ress: Response ) => <Array<Project>>ress.json() )
            .catch( this.handleError );
    }
     public getChargeCode (project_Id:number): Observable <Array<ChargeCode>> {
           	let headers = new Headers({ "Content-Type": "application/json"});
		let options = new RequestOptions({headers: headers});
       console.log("Retrieving Charge Code List.")
       return this.http.post(this.baseURL+'charge_code/get_charge_code'
               ,JSON.stringify({"projectId": project_Id}),options)
               
       .map((ress: Response) => <Array<ChargeCode>> ress.json())
       .catch(this.handleError);
   }

   public getContact (project_Id:number): Observable <Array<Contact>> {
           	let headers = new Headers({ "Content-Type": "application/json"});
		let options = new RequestOptions({headers: headers});
       console.log("Retrieving Contact List.")
       return this.http.post(this.baseURL+'contact/project/get'
               ,JSON.stringify({"projectId": project_Id}),options)
               
       .map((ress: Response) => <Array<Contact>> ress.json())
       .catch(this.handleError);

   }

    public getAssignedEmployeesToProjectId( project_Id: number ): Observable<Array<Employee>> {
        let headers = new Headers( { "Content-Type": "application/json" } );
        let options = new RequestOptions( { headers: headers } );
        console.log( "Retrieving assigned employees for project id: ", project_Id );

        return this.http.post( this.baseURL + 'employees/get'
            , JSON.stringify( { "projectId": project_Id } ),
            options )
            .map(( ress: Response ) => <Array<Employee>>ress.json() )
            .catch( this.handleError );

    }

    private handleError( error: any ): Promise<Object> {
        console.log( "error: ", error );
        return Promise.reject( error.message || error );
    }
    public getToken(): String {
        let token = sessionStorage.getItem( 'currentUser' );
        return token ? token : "";
    }
    public getProjectById( project_Id: number ): Observable<Project> {

        let headers = new Headers( { "Content-Type": "application/json" } );
        let options = new RequestOptions( { headers: headers } );

        console.log( "Retrieving all projectbyId(%s).", project_Id );

        return this.http.post( this.baseURL + 'get_project_by_id'
            , JSON.stringify( { "projectId": project_Id } ),
            options )
            .map(( ress: Response ) => <Project>ress.json() )
            .catch( this.handleError );
    }
    
    public getAllEmployees(): Observable<Array<Employee>> {
        let headers = new Headers( { "Content-Type": "application/json" } );
        let options = new RequestOptions( { headers: headers } );
        console.log( "Retrieving all employees." )

        return this.http.get( this.baseURL + 'employees/get/all' )
            .map(( ress: Response ) => <Array<Employee>>ress.json() )
            .catch( this.handleError );
    }
    public getAllEmployeesInfo(): Observable<Array<Employee>> {
        let headers = new Headers( { "Content-Type": "application/json" } );
        let options = new RequestOptions( { headers: headers } );
        console.log( "Retrieving all employees." )

        return this.http.get( this.baseURL + 'employees/get/all/info' )
            .map(( ress: Response ) => <Array<Employee>>ress.json() )
            .catch( this.handleError );
    }
    
    public getAllocatedEmployees(): Observable<Array<EmployeeProjectAssoc>> {
        let headers = new Headers( { "Content-Type": "application/json" } );
        let options = new RequestOptions( { headers: headers } );
        console.log( "Retrieving all employees." )

        return this.http.get( this.baseURL + 'employees/get/allocated' )
            .map(( ress: Response ) => <Array<EmployeeProjectAssoc>>ress.json() )
            .catch( this.handleError );
    }

    // public getAllProjectDates(): Observable<Array<ProjectDates>> {
    //     console.log( "Retrieving list of project dates." )
    //     return this.http.get( this.baseURL + 'get/project/dates' )
    //         .map(( ress: Response ) => <Array<ProjectDates>>ress.json() )
    //         .catch( this.handleError );
    // }
}
