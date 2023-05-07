import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../../services/AuthService";
import RoleService from "../../../services/RoleService";
import RoleForm from "../../../components/forms/RoleForm";
import { toast } from "react-toastify";

function UserRoleList(props: any) {
  const navigate = useNavigate();
  const permission = AuthService.getPermission('ROLE');
  const [roles, setRoles] = useState([]);
  const [selected, setSelected] = useState({
    name: '',
    description: '',
    privileges: []
  });
  const [action, setAction] = useState('none');

  const addRole = (e: any) => {
    setAction('add');
  }

  const loadRoles = () => {
    RoleService.findAll().then(response => {
      setRoles(response.data);
    }).catch(reason => {
      if (reason.code === "ERR_NETWORK") {
        navigate("/maintenance");
      }
      if (reason.response.status === 401) {
        AuthService.logout();
        navigate("/login");
      }
    });
  }
  const loadPermissions = (e: any) => {
    loadRole(e.target.dataset.role);
  }

  const loadRole = (roleId: any) => {
    RoleService.findById(roleId).then(response => {
      setSelected(response.data);
    }).catch(reason => {
      console.log(reason);
    });
  }

  const checkHandler = (e: any) => {
    let record = {
      id: e.target.dataset.id,
      field: e.target.dataset.field,
      value: e.target.checked,
    }
    console.log(record);
    RoleService.updatePermission(record).then(response => {
      loadRole(response.data.roleId)
      toast.success(response.data.permission + '-' + record.field + ' Updated!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "light",
      });
    }).catch(reason => {
      console.log(record);
    })
  }

  // select all functions
  const checkAllListHandler = (e: any) => {
    let record = {
      field: e.target.id,
      value: e.target.checked,
    }
    const result = selected?.privileges?.map(({ id, list }) => ({ id, list, value: record?.value }));
    console.log(result);
    // const inputId = e.target.id;
  }



  const checkAllAddHandler = (e: any) => {
    let record = {
      field: e.target.id,
      value: e.target.checked,
    }
    const result = selected?.privileges?.map(({ id, create }) => ({ id, create, value: record?.value }));
    console.log(result);
  }

  const checkAllViewHandler = (e: any) => {
    let record = {
      field: e.target.id,
      value: e.target.checked,
    }
    const result = selected?.privileges?.map(({ id, view }) => ({ id, view, value: record?.value }));
    console.log(result);
  }


  const checkAllEditHandler = (e: any) => {
    let record = {
      field: e.target.id,
      value: e.target.checked,
    }
    const result = selected?.privileges?.map(({ id, edit }) => ({ id, edit, value: record?.value }));
    console.log(result);
  }


  const checkAllPayHandler = (e: any) => {
    let record = {
      field: e.target.id,
      value: e.target.checked,
    }
    const result = selected?.privileges?.map(({ id, pay }) => ({ id, pay, value: record?.value }));
    console.log(selected.privileges);
    console.log(result);
  }



  const onSuccess = (e: any) => {
    setAction('none');
    loadRoles();
  }
  const onCancel = (e: any) => {
    setAction('none');
  }

  useEffect(() => {
    loadRoles();
  }, []);



  return (
    <>
      <div className="app-content content">
        <div className="content-wrapper">
          <div className="content-wrapper-before"></div>
          <div className="content-header row">
            <div className="content-header-left col-md-4 col-12 mb-2">
              <h3 className="content-header-title">List Of Roles</h3>
            </div>
            <div className="content-header-right col-md-8 col-12">
              <div className="breadcrumbs-top float-md-right">
                <div className="breadcrumb-wrapper mr-1">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Home</a>
                    </li>
                    <li className="breadcrumb-item"><a href="/user">User</a>
                    </li>
                    <li className="breadcrumb-item active">List
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="content-body">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="card">
                  <div className="card-content collapse show">
                    <div className="card-header">
                      <h5 className={'card-title'}>
                        Roles

                        {permission.create ? <button className="btn btn-sm btn-info box-shadow-1 pull-right" onClick={addRole}>
                          <i className="ft-plus"></i>Add Role
                        </button> : ''}
                      </h5>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table">
                          <thead className="bg-primary white">
                            <tr>
                              <th>#</th>
                              <th>Role Name</th>
                              <th>Description</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {roles.map((role: any) => (
                              <tr>
                                <th scope="row">{role.id}</th>
                                <td>{role.name}</td>
                                <td>{role.description}</td>
                                <td>
                                  {permission.view ? <button className="btn btn-sm btn-info box-shadow-1 pull-right" data-role={role.id} onClick={loadPermissions}>
                                    <i className="ft-shield"></i>Permissions
                                  </button> : ''}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {permission.view ? <div className="col-md-6 col-sm-12">
                <div className="card">
                  <div className="card-content collapse show">
                    <div className="card-header d-flex justify-content-between ">

                      <h5 className={'card-title'}>Permissions of {selected?.name}</h5>

                    </div>
                    <div className="card-body pt-0">
                      <div className="table-responsive">
                        <table className="table">
                          <thead className="bg-primary white">
                            <tr>
                              <th>#</th>
                              <th>User Interface</th>
                              <th className='text-left'>
                                {selected?.name && <input onClick={checkAllListHandler} className="rolegap cursor-pointer" type="checkbox" id="listAll" />}
                                <label className="form-check-label cursor-pointer" htmlFor="listAll">
                                  List
                                </label>
                              </th>
                              <th>
                                {selected?.name && <input onClick={checkAllAddHandler} className="rolegap cursor-pointer" type="checkbox" id="addAll" />}
                                <label className="form-check-label cursor-pointer" htmlFor="addAll">
                                  Add
                                </label>

                              </th>
                              <th>
                                {selected?.name && <input onClick={checkAllViewHandler} className="rolegap cursor-pointer" type="checkbox" id="viewAll" />}
                                <label className="form-check-label cursor-pointer" htmlFor="viewAll">
                                  View
                                </label>
                              </th>
                              <th>
                                {selected?.name && <input onClick={checkAllEditHandler} className="rolegap cursor-pointer" type="checkbox" id="editAll" />}
                                <label className="form-check-label cursor-pointer" htmlFor="editAll">
                                  Edit
                                </label>
                              </th>
                              {/*<th>Delete</th>*/}
                              <th>
                                {selected?.name && <input onClick={checkAllPayHandler} className="rolegap cursor-pointer" type="checkbox" id="payAll" />}
                                <label className="form-check-label cursor-pointer" htmlFor="payAll">
                                  Pay
                                </label>

                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {selected.privileges.map((privilege: any, index) => (
                              <tr className='' >
                                <th scope="row">{index + 1}</th>
                                <td>{privilege.permission}</td>
                                <td className='text-center'><input type="checkbox" data-id={privilege.id} data-field="list" onClick={checkHandler} checked={privilege.list} disabled={permission.edit ? false : true} /></td>
                                <td className='text-center'><input type="checkbox" data-id={privilege.id} data-field="create" onClick={checkHandler} checked={privilege.create} disabled={permission.edit ? false : true} /></td>
                                <td className='text-center'><input type="checkbox" data-id={privilege.id} data-field="view" onClick={checkHandler} checked={privilege.view} disabled={permission.edit ? false : true} /></td>
                                <td className='text-center'><input type="checkbox" data-id={privilege.id} data-field="edit" onClick={checkHandler} checked={privilege.edit} disabled={permission.edit ? false : true} /></td>
                                {/*<td className='text-center'><input type="checkbox" data-id={privilege.id} data-field="remove" onClick={checkHandler} checked={privilege.remove}/></td>*/}
                                <td className='text-center'><input type="checkbox" data-id={privilege.id} data-field="pay" onClick={checkHandler} checked={privilege.pay} disabled={permission.edit ? false : true} /></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div> : ''}
            </div>
          </div>
        </div>
      </div>
      {
        action == 'add' ?
          <div className={`modal fade fadeIn show`} role="dialog"
            style={{ display: 'block' }} data-backdrop="false" tabIndex={-1}>
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
              <div className="modal-content scroll-95">
                <div className="modal-body">
                  <RoleForm onCancel={onCancel} onSuccess={onSuccess} />
                </div>
              </div>
            </div>
          </div> : ""
      }
    </>
  );
}

export default UserRoleList;
