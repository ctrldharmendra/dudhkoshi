<FiCompass className="text-[length:var(--iconTextSize)]" /> --> for custom variable text size 
# const uploadFolderPath = path.join(__dirname, '..', 'uploads'+"/"); -- get uploaded file base path 

#####check if any obeject is empty 
if (Object.keys(user).length === 0) {
  console.log("Object is empty");
}



#### ROLEPERMISSION SLICE 
const permissionOfLoggedInRoleOfUser = useSelector((state) => state?.roleAndPermission?.permissionOfLoggedInRoleOfUser);   
#####from stateSlice
  const user = useSelector((state) => state.userState.selectedUser);  //selectedUser object



##########
       const result = await dispatch(updateBasicDetailsloggedInUser({formData}));
           if (updateBasicDetailsloggedInUser.fulfilled.match(result)) {
                router.refresh();
                toast.success("Update Success.")
                setIsEditing(false)
                }


LOADING 
if (loadingOfGetRolePermission) {
  return <div className='bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center'>
   <TinyLoader></TinyLoader>
  </div>;
}


------------------------------- 
  accept="
    image/*,
    application/pdf,
    application/vnd.ms-excel,
    application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
  "