import { faSyncAlt } from '@fortawesome/free-solid-svg-icons/faSyncAlt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Theme } from '@material-ui/core/styles/createTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    ChonkyActions,
    FileBrowser,
    FileContextMenu,
    FileData,
    FileList,
    FileNavbar,
    FileToolbar,
    setChonkyDefaults,
} from 'chonky';
import { ChonkyIconFA } from 'chonky-icon-fontawesome';
import React, { useCallback, useMemo } from 'react';
import { getButtonStyles } from '../components/LinkButton';
import {
    useCustomFileMap,
    useFileActionHandler,
    useFiles,
    useFolderChain,
} from './demo-hooks';
import NavBarBox from '../components/BoxNavBar'
import { Container } from '@material-ui/core';
import "./demo-styles.css";

setChonkyDefaults({ iconComponent: ChonkyIconFA });

export const DemoComponent: React.FC = () => {
    const {
        fileMap,
        currentFolderId,
        setCurrentFolderId,
        resetFileMap,
        deleteFiles,
        moveFiles,
        createFolder,
    } = useCustomFileMap();
    const files = useFiles(fileMap, currentFolderId);
    const folderChain = useFolderChain(fileMap, currentFolderId);
    const handleFileAction = useFileActionHandler(
        setCurrentFolderId,
        deleteFiles,
        moveFiles,
        createFolder,
    );
    const fileActions = useMemo(
        () => [ChonkyActions.CreateFolder, ChonkyActions.DeleteFiles,ChonkyActions.DownloadFiles,ChonkyActions.UploadFiles],
        []
    );
    const thumbnailGenerator = useCallback(
        (file: FileData) =>
            file.thumbnailUrl ? `https://chonky.io${file.thumbnailUrl}` : null,
        []
    );

    const classes = useStyles();

    return (
        <>
        <NavBarBox/>
            <Paper  className={classes.demoWrapper} elevation={3}>
                <FileBrowser
                    instanceId={'chonky-demo'}
                    files={files}
                    folderChain={folderChain}
                    fileActions={fileActions}
                    onFileAction={handleFileAction}
                    thumbnailGenerator={thumbnailGenerator}
                >
                    <Container style={{marginLeft: '30px'}}>
                    <FileNavbar />
                    <FileToolbar />
                    <div style={{height: '1500px'}}>   
                    <FileList />
                    </div>
                    </Container>
                    <FileContextMenu />
                </FileBrowser>
            </Paper>
        </>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root:{
            margin: "0px"
        },
        demoWrapper: {
            height: 600,
            minWidth: 1140,
            width: "100%",
        },
        buttonContainer: {
            textAlign: 'center',
            padding: 10,
        },
        button: {
            textTransform: 'none',
            fontWeight: 'bold',
            margin: '10px',
            ...getButtonStyles(theme, '#654295'),
        },
    })
);
