var mlGrid;
(function (mlGrid) {
    
    var moduleName = "ml-grid";
    var gridTagName = "grid";
    
    angular.module(moduleName, function(){}).directive(gridTagName, function ($compile) {
        var compile=$compile;
        return{
            restrict: "E",
            compile: function(tElement, tAttrs, transclude){
                return function(scope, element, attrs){
                    var configId=attrs.config;
                    if(configId){
                        var grid=scope[configId];
                        grid.renderCell = function(index) {
                            column=this.columns[index];
                            if(column.cellRenderer){
                               if(typeof(column.cellRenderer) == "function"){
                                   return "{{ "+configId+".columns["+index+"].cellRenderer(row) }}"
                               }else{
                                    return column.cellRenderer;
                               }
                            }
                            
                            return "{{ row."+column.name+" }}";
                        }
                        grid.dynamicSort=function(property) {
                            var sortOrder = this.sortOrder;
                            return function (a,b) {
                                var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                                return result * sortOrder;
                            }
                        }
                        grid.sortGridOn=function(column){
                            if(column.sortable){
                                this.sortOrder=(this.sortedOn==column.name)?this.sortOrder*(-1):1;
                                this.sortedOn=column.name;
                                var data=scope[this.data];
                                var sortFunc=this.dynamicSort(this.sortedOn)
                                if(column.sortFunction)
                                    sortFunc=column.sortFunction;
                                
                                data.sort(sortFunc);   
                            }
                        }
                        grid.sortedOn="";
                        grid.sortOrder=1;

                        var html="<table class='table table-striped table-bordered table-hover'> <thead class='header'><tr><th class='sortable sorted' ng-repeat='column in "+configId+".columns' ng-style='{width: column.width}' ng-click='"+configId+".sortGridOn(column)' bn-log-dom-creation class='rowCell'>{{ column.sortable?( "+configId+".sortOrder==1 && column.sortedOn==column.name?'&uarr;':'&darr;'):'' }} {{ column.label }}</th></tr></thead>";
                        html+="<tbody><tr ng-repeat='row in "+grid.data+"' ng-class-odd='odd' ng-class-even='even' bn-log-dom-creation>";
                        for(var i=0;i<grid.columns.length;i++){
                            html+="<td ng-class='success'>"+( grid.renderCell(i) )+"</td>";
                        }
                        html+="</tr></tbody></table>";
                        
                        element.html(html);
                        angular.element(document).injector().invoke(function($compile) {
                            $compile(element.contents())(scope);
                        });                    
                        
                    }
                } 
            }
        }
    });
    
})(mlGrid||(mlGrid={}))

