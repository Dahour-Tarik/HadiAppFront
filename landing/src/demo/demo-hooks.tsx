/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

 import {
    ChonkyActions,
    ChonkyFileActionData,
    FileArray,
    FileData,
    FileHelper,
} from 'chonky';
import React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { showActionNotification } from './demo-util';
import DemoFsMap from './demo.fs_map.json';
import axios from 'axios';

type CustomFileData = FileData & {
    parentId?: string;
    childrenIds?: string[];
};
type CustomFileMap = { [fileId: string]: CustomFileData };



const RootFolderId = DemoFsMap.rootFolderId;
const BaseFileMap = (DemoFsMap.fileMap as unknown) as CustomFileMap;


// TODO export const modalFile = () => {}

export const useCustomFileMap = () => {
    const [fileMap, setFileMap] = useState(BaseFileMap);
    const [currentFolderId, setCurrentFolderId] = useState(RootFolderId);
    
      const fetchData = React.useCallback(() => {
        axios.get("http://localhost:28080/doc/getdocs")
        .then((response) => {
            const data: CustomFileMap = response.data.fileMap;
            const idFolder = response.data.rootFolderId;
            setFileMap(data);
            setCurrentFolderId(idFolder);
        })
        .catch((error) => {
          console.log(error)
        })
      }, [])
      
      React.useEffect(() => {
        fetchData()
      }, [fetchData])
    
      
    const currentFolderIdRef = useRef(currentFolderId);
    useEffect(() => {
        currentFolderIdRef.current = currentFolderId;
    }, [currentFolderId]);

    const resetFileMap = useCallback(() => {
        setFileMap(BaseFileMap);
        setCurrentFolderId(RootFolderId);
    }, []);



    const deleteFiles = useCallback(
        (files: CustomFileData[]) =>
            setFileMap((oldFileMap) => {
                const newFileMap = { ...oldFileMap };
                files.map((file) => {
                    delete newFileMap[file.id];
                    axios.delete("http://localhost:28080/folders/deleteRepo/"+file.id)
                    .then((response) => {
                       console.log(response);
                    })
                    .catch(error => {
                        console.error('There was an error!', error);
                    });
                    if (file.parentId) {
                        const parent = newFileMap[file.parentId]!;
                        const newChildrenIds = parent.childrenIds!.filter(
                            (id) => id !== file.id
                        );
                        newFileMap[file.parentId] = {
                            ...parent,
                            childrenIds: newChildrenIds,
                            childrenCount: newChildrenIds.length,
                        };
                    }
                    return undefined;
                });
                return newFileMap;
            }),
        []
    );

    const moveFiles = useCallback(
        (
            files: CustomFileData[],
            source: CustomFileData,
            destination: CustomFileData
        ) =>
            setFileMap((oldFileMap) => {
                const newFileMap = { ...oldFileMap };
                const moveFileIds = new Set(files.map((f) => f.id));
                const newSourceChildrenIds = source.childrenIds!.filter(
                    (id) => !moveFileIds.has(id)
                );
                newFileMap[source.id] = {
                    ...source,
                    childrenIds: newSourceChildrenIds,
                    childrenCount: newSourceChildrenIds.length,
                };
                const newDestinationChildrenIds = [
                    ...destination.childrenIds!,
                    ...files.map((f) => f.id),
                ];
                newFileMap[destination.id] = {
                    ...destination,
                    childrenIds: newDestinationChildrenIds,
                    childrenCount: newDestinationChildrenIds.length,
                };
                files.map((file) => {
                    axios.put("http://localhost:28080/folders/moveFolder/"+file.id+"/"+destination.id)
                    .then((response) => {
                       console.log(response);
                    })
                    .catch(error => {
                        console.error('There was an error!', error);
                    });
                    newFileMap[file.id] = {
                        ...file,
                        parentId: destination.id,
                    };
                    return undefined;
                });
                return newFileMap;
            }),
        []
    );

    //const idCounter = useRef(0);
    const createFolder = useCallback(
        (folderName: string) =>
            setFileMap((oldFileMap) => {
                console.log(oldFileMap);
                const newFileMap = { ...oldFileMap };
                axios.post("http://localhost:28080/folders/creeRepo", {
                    name: folderName,
                    path: "local/",
                    dateModified: null,
                    repDateCreation: new Date(),
                    parents: {id: currentFolderIdRef.current},
                    hasChild: null,
                    filterPath: null,
                    sizeRepo: 0,
                    user:  {id: 1},
                    docs: [],
                    enfants: [],
                    historyList: [],
                    file: false
                    // TODO: Update userId
                })
                .then((response) => {
                    const newFolderId = response.data.id+'';
                    newFileMap[newFolderId] = {
                        id: newFolderId,
                        name: response.data.name,
                        isDir: true,
                        modDate: response.data.repDateCreation,
                        parentId: currentFolderIdRef.current,
                        childrenIds: [],
                        childrenCount: 0,
                    };
                    const parent = newFileMap[currentFolderIdRef.current];
                    newFileMap[currentFolderIdRef.current] = {
                        ...parent,
                        childrenIds: [...parent.childrenIds!, newFolderId],
                    };
                    //const newId = newFolderId.substr(11);
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
                window.location.reload(false);
                return newFileMap;
            }),
        [currentFolderIdRef]
    );

    //const uploadFiles =     

  /*  const renameFile = useCallback((
        file: CustomFileData,
        newName: string
    ) => setFileMap((oldFileMap) => {
        const newFileMap = { ...oldFileMap };
        newFileMap[file.id].name = newName
        axios.put("http://localhost:28080/folders//updateName", {
            name: newName,
            path: "local/",
            dateModified: null,
            repDateCreation: new Date(),
            parents: {id: currentFolderIdRef.current},
            hasChild: null,
            filterPath: null,
            sizeRepo: 0,
            user:  {id: 1},
            docs: [],
            enfants: [],
            historyList: [],
            file: false
            // TODO: Update userId
        })
        .then((response) => {
                       console.log(response);
                    })
        .catch(error => {
                        console.error('There was an error!', error);
                    });
        return newFileMap
    }),
    []
    );*/

    return {
        fileMap,
        currentFolderId,
        setCurrentFolderId,
        resetFileMap,
        deleteFiles,
        moveFiles,
        createFolder,
    };
};

export const useFiles = (
    fileMap: CustomFileMap,
    currentFolderId: string
): FileArray => {
    return useMemo(() => {
        const currentFolder = fileMap[currentFolderId];
        const files = currentFolder.childrenIds
            ? currentFolder.childrenIds.map((fileId: string) => fileMap[fileId] ?? null)
            : [];
        return files;
    }, [currentFolderId, fileMap]);
};

export const useFolderChain = (
    fileMap: CustomFileMap,
    currentFolderId: string
): FileArray => {
    return useMemo(() => {
        const currentFolder = fileMap[currentFolderId];

        const folderChain = [currentFolder];

        let parentId = currentFolder.parentId;
        while (parentId) {
            const parentFile = fileMap[parentId];
            if (parentFile) {
                folderChain.unshift(parentFile);
                parentId = parentFile.parentId;
            } else {
                break;
            }
        }

        return folderChain;
    }, [currentFolderId, fileMap]);
};

export const useFileActionHandler = (
    setCurrentFolderId: (folderId: string) => void,
    deleteFiles: (files: CustomFileData[]) => void,
    moveFiles: (files: FileData[], source: FileData, destination: FileData) => void,
    createFolder: (folderName: string) => void
) => {
    return useCallback(
        (data: ChonkyFileActionData) => {
            if (data.id === ChonkyActions.OpenFiles.id) {
                const { targetFile, files } = data.payload;
                const fileToOpen = targetFile ?? files[0];
                if (fileToOpen && FileHelper.isDirectory(fileToOpen)) {
                    setCurrentFolderId(fileToOpen.id);
                    return;
                }
            } else if (data.id === ChonkyActions.DeleteFiles.id) {
                deleteFiles(data.state.selectedFilesForAction!);
            } else if (data.id === ChonkyActions.MoveFiles.id) {
                moveFiles(
                    data.payload.files,
                    data.payload.source!,
                    data.payload.destination
                );
            } else if (data.id === ChonkyActions.CreateFolder.id) {
                const folderName = prompt('Provide the name for your new folder:');
                if (folderName) createFolder(folderName);
            }

            showActionNotification(data);
        },
        [createFolder, deleteFiles, moveFiles, setCurrentFolderId]
    );
};

export default {
    useCustomFileMap,
    useFiles,
    useFolderChain,
    useFileActionHandler,
};
