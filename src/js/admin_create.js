var create = {
    tableItem: function() {
        var tableTr = document.createElement('TR');
        var tableDate = document.createElement('TD');
        var tableTitle = document.createElement('TD');
        var tableTag = document.createElement('TD');
        var tableEdit = document.createElement('TD');
        var tableDelete = document.createElement('TD');
        var editBtn = document.createElement('A');
        var deleteBtn = document.createElement('A');
        tableTr.appendChild(tableDate);
        tableTr.appendChild(tableTitle);
        tableTr.appendChild(tableTag);
        tableTr.appendChild(tableEdit);
        tableTr.appendChild(tableDelete);
        tableEdit.appendChild(editBtn);
        tableDelete.appendChild(deleteBtn);
        editBtn.innerText = '修改';
        deleteBtn.innerText = '删除';
        this._item = tableTr;
        this._fill = function(obj) {
            tableDate.innerText = obj.date;
            tableTitle.innerText = obj.title;
            tableTag.innerText = obj.tag;
        }
        this._edit = function() {
            return editBtn;
        }
        this._delete = function() {
            return deleteBtn;
        }
    }
}
module.exports = create;
