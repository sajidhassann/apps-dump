import { Box, Group, Skeleton, Table } from '@mantine/core'

export default function TableSkeleton() {
   return (
      <Box mx="auto">
         <Table
            highlightOnHover
            striped
            withBorder
            verticalSpacing="xs"
            horizontalSpacing="md"
         >
            <thead>
               <tr>
                  <th>
                     <Skeleton height={8} mt={6} width="70%" radius="xl" />
                  </th>
                  <th>
                     <Skeleton height={8} mt={6} width="70%" radius="xl" />
                  </th>
                  <th>
                     <Skeleton height={8} mt={6} width="70%" radius="xl" />
                  </th>
                  <th>
                     <Skeleton height={8} mt={6} width="70%" radius="xl" />
                  </th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td>
                     <Skeleton height={8} mt={6} width="70%" radius="xl" />
                  </td>
                  <td>
                     <Skeleton height={8} mt={6} width="70%" radius="xl" />
                  </td>
                  <td>
                     <Skeleton height={8} mt={6} width="70%" radius="xl" />
                  </td>
                  <td>
                     <Skeleton height={8} mt={6} width="70%" radius="xl" />
                  </td>
               </tr>
               <tr>
                  <td>
                     <Skeleton height={8} mt={6} width="70%" radius="xl" />
                  </td>
                  <td>
                     <Skeleton height={8} mt={6} width="70%" radius="xl" />
                  </td>
                  <td>
                     <Skeleton height={8} mt={6} width="70%" radius="xl" />
                  </td>
                  <td>
                     <Skeleton height={8} mt={6} width="70%" radius="xl" />
                  </td>
               </tr>
               <tr>
                  <td>
                     <Skeleton height={8} mt={6} width="70%" radius="xl" />
                  </td>
                  <td>
                     <Skeleton height={8} mt={6} width="70%" radius="xl" />
                  </td>
                  <td>
                     <Skeleton height={8} mt={6} width="70%" radius="xl" />
                  </td>
                  <td>
                     <Skeleton height={8} mt={6} width="70%" radius="xl" />
                  </td>
               </tr>
            </tbody>
         </Table>

         <Group position="right" mt="lg">
            <Skeleton height={30} circle mb="xl" />
            <Skeleton height={30} circle mb="xl" />
            <Skeleton height={30} circle mb="xl" />
            <Skeleton height={30} circle mb="xl" />
         </Group>
      </Box>
   )
}
