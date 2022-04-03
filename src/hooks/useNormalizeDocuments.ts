import React from 'react'
import type { DocumentData, FirestoreError, QuerySnapshot } from 'firebase/firestore'
import type { UseInfiniteQueryResult } from 'react-query'

export const useNormalizeDocuments = (
  query: UseInfiniteQueryResult<
    QuerySnapshot<DocumentData>,
    FirestoreError
  >,
) => {
  const [records, setRecords] = React.useState<Array<DocumentData>>([])

  React.useEffect(() => {
    if (query.data?.pages) {
      setRecords([])
      query.data.pages.forEach((page) =>
        page.docs.forEach((docSnapshot) => {
          const rawRecord = docSnapshot.data()

          setRecords((prevState) => [
            ...prevState,
            {
              ...rawRecord,
              createdAt: rawRecord.createdAt.toDate(),
              updatedAt: rawRecord.updatedAt?.toDate(),
            },
          ])
        }),
      )
    }
  }, [query.data?.pages])

  return records
}
