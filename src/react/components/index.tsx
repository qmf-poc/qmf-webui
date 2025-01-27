import {Box, Button, TextField} from '@mui/material';
import React, {useContext, useState} from 'react';
import Grid from '@mui/material/Grid2';
import {QmfServiceContext} from '../../context';
import useObservable from '../hooks/useObservable';

const Home: React.FunctionComponent = (): React.ReactElement => {
  const qmfService = useContext(QmfServiceContext);
  const results = useObservable(qmfService.observableLastSearchResult(), []);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const [searchQuery, setSearchQuery] = useState<string>('');

  return <Box
    display="flex"
    flexDirection="column"
    height="100vh"
    width="100vw"
  >
    {/* Row 1 */}
    <Box
      flex="0 0 auto"
      bgcolor="lightblue"
      p={2}
      borderBottom="1px solid gray"
    >
      <Box
        display="flex"
        flexDirection={{xs: 'column', sm: 'row'}}
        gap={2}
        width="100%"
      >
        <TextField
          label="JDBC Connection String"
          helperText="Demo only - must be agent configuration"
          variant="outlined"
          fullWidth
          sx={{flex: {sm: 2, xs: 1}}}
        />
        <TextField
          label="User"
          helperText="demo: db2inst1"
          variant="outlined"
          fullWidth
          sx={{flex: {sm: 1, xs: 1}}}
        />
        <TextField
          label="Password"
          helperText="demo: password"
          variant="outlined"
          fullWidth
          type="password"
          sx={{flex: {sm: 1, xs: 1}}}
        />
      </Box>
    </Box>

    {/* Row 2 */}
    <Box
      flex="0 0 auto"
      bgcolor="lightgreen"
      p={2}
      borderBottom="1px solid gray"
    >
      <Grid container spacing={2} alignItems="center" display="flex">
        <Grid size={'auto'} flexGrow={1}>
          <TextField
            fullWidth
            label="Search"
            variant="outlined"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                qmfService.search(searchQuery).then();
              }
            }}
          />
        </Grid>
        <Grid size={'auto'}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => qmfService.search(searchQuery)}
          >
            Search
          </Button>
        </Grid>
        <Grid size={'auto'}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => qmfService.refresh()}
          >
            Reload Catalog
          </Button>
        </Grid>
      </Grid>
    </Box>

    {/* Row 3 */}
    <Box flex="1" bgcolor="lightcoral" p={2}>
      {
        results.map(qmfObject => <div key={`${qmfObject.name} ${qmfObject.owner} ${qmfObject.type}`}>{qmfObject.name} {qmfObject.owner} {qmfObject.type}</div>)
      }
    </Box>
  </Box>;
};

export default Home;
